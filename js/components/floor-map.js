/**
 * KKWIEER Main Building - Interactive Floor Map Component
 * 
 * Provides:
 * 1. Interactive floor-wise SVG maps (Ground, 1st, 2nd, 3rd Floor)
 * 2. Route highlighting with prominent accessible colors and directional arrows
 * 3. Clearing previous route before rendering new ones
 * 4. Start point marker (📍 You Are Here) & Destination marker (🎯 Room)
 * 5. Landmark callouts: Mechanical Engg Board, Computer Engg Board, Ganesh Statue, Staircases
 * 6. Multi-floor transition segmentation & floor switching
 * 7. Active step synchronization between map and written directions
 * 8. Survey status and data conflict indicators
 */

import { VALIDATION_REPORT } from "../data/verified-routes.js";

export class FloorMap {
  constructor(options = {}) {
    this.container = options.container || document.getElementById("floor-map-container");
    this.onStepSelect = options.onStepSelect || (() => {});
    this.currentFloor = "G";
    this.activeRoute = null;
    this.activeStepIndex = 0;
    this.activeRouteFloor = null;

    // Pan & Zoom State (Mobile touch gestures & Desktop)
    this.defaultViewBox = { x: 260, y: 220, w: 440, h: 310 };
    this.viewBox = { ...this.defaultViewBox };
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };
    this.pinchDistance = 0;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="floor-map-wrapper">
        <!-- Floor Map Control Bar -->
        <div class="map-controls-header">
          <div class="map-floor-tabs" id="map-floor-tabs">
            <button class="map-floor-btn ${this.currentFloor === 'G' ? 'active' : ''}" data-floor="G">
              <span class="floor-tag">G</span> Ground (Mechanical)
            </button>
            <button class="map-floor-btn ${this.currentFloor === '1' ? 'active' : ''}" data-floor="1">
              <span class="floor-tag">1</span> 1st Floor (Mechanical)
            </button>
            <button class="map-floor-btn ${this.currentFloor === '2' ? 'active' : ''}" data-floor="2">
              <span class="floor-tag">2</span> 2nd Floor (Computer)
            </button>
            <button class="map-floor-btn ${this.currentFloor === '3' ? 'active' : ''}" data-floor="3">
              <span class="floor-tag">3</span> 3rd Floor (Computer)
            </button>
          </div>
        </div>

        <!-- First-Person Navigation Direction HUD -->
        <div class="map-nav-hud hidden" id="map-nav-hud">
          <div class="nav-hud-left">
            <div class="nav-hud-icon-badge straight" id="hud-icon-badge">↑</div>
            <div class="nav-hud-content">
              <div class="nav-hud-action-row">
                <span class="nav-hud-action-tag" id="hud-action-tag">NAVIGATION READY</span>
                <span class="nav-hud-step-count" id="hud-step-count">Step 1</span>
              </div>
              <div class="nav-hud-instruction" id="hud-instruction">Select a destination to start indoor navigation</div>
            </div>
          </div>
          <div class="nav-hud-nav-btns">
            <button class="btn-hud-nav" id="btn-hud-prev" title="Previous step" aria-label="Previous step">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="btn-hud-nav" id="btn-hud-next" title="Next step" aria-label="Next step">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        <!-- SVG Map Canvas with Zoom & Pan Viewport -->
        <div class="map-svg-viewport" id="map-svg-viewport">
          <svg 
            id="campus-floor-svg" 
            class="campus-floor-svg" 
            viewBox="${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}" 
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="KKWIEER Campus Indoor Interactive Map"
          >
            <defs>
              <!-- Route Arrow Marker -->
              <marker id="route-arrow-marker" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 1 2 L 10 6 L 1 10 z" fill="#b91c1c" />
              </marker>
              <!-- Active Step Arrow Marker -->
              <marker id="active-arrow-marker" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 1 2 L 10 6 L 1 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            <!-- Base Grid & Ambient Background -->
            <rect x="250" y="210" width="460" height="330" fill="#f8fafc" rx="8" />

            <!-- Floor Architectural Geometry Container -->
            <g id="map-floor-geometry"></g>

            <!-- Route Base Context Layer -->
            <g id="map-route-base-layer"></g>

            <!-- Active Step Segment Layer -->
            <g id="map-active-segment-layer"></g>

            <!-- First-Person Turn Indicator Layer -->
            <g id="map-turn-indicator-layer"></g>

            <!-- Markers Layer (You Are Here, Start, Dest) -->
            <g id="map-markers-layer"></g>
          </svg>

          <!-- Interactive Map Zoom & Reset Controls -->
          <div class="map-zoom-controls">
            <button id="btn-zoom-in" class="btn-map-zoom" title="Zoom in" aria-label="Zoom in">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button id="btn-zoom-out" class="btn-map-zoom" title="Zoom out" aria-label="Zoom out">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button id="btn-zoom-reset" class="btn-map-zoom" title="Reset view" aria-label="Reset map view">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
    this.initPanAndZoom();
    this.renderFloorGeometry(this.currentFloor);
  }

  attachEvents() {
    const tabBtns = this.container.querySelectorAll(".map-floor-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const floor = btn.getAttribute("data-floor");
        this.switchFloor(floor);
      });
    });

    const btnHudPrev = this.container.querySelector("#btn-hud-prev");
    const btnHudNext = this.container.querySelector("#btn-hud-next");
    if (btnHudPrev) {
      btnHudPrev.addEventListener("click", () => {
        if (this.activeRoute && this.activeStepIndex > 0) {
          this.onStepSelect(this.activeStepIndex - 1);
        }
      });
    }
    if (btnHudNext) {
      btnHudNext.addEventListener("click", () => {
        if (this.activeRoute && this.activeStepIndex < this.activeRoute.steps.length - 1) {
          this.onStepSelect(this.activeStepIndex + 1);
        }
      });
    }
  }

  initPanAndZoom() {
    const viewport = this.container.querySelector("#map-svg-viewport");
    const svg = this.container.querySelector("#campus-floor-svg");
    if (!viewport || !svg) return;

    // Zoom buttons
    const btnZoomIn = this.container.querySelector("#btn-zoom-in");
    const btnZoomOut = this.container.querySelector("#btn-zoom-out");
    const btnZoomReset = this.container.querySelector("#btn-zoom-reset");

    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", () => this.zoom(0.8));
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", () => this.zoom(1.25));
    }
    if (btnZoomReset) {
      btnZoomReset.addEventListener("click", () => this.resetZoom());
    }

    // Mouse drag to pan
    viewport.addEventListener("mousedown", (e) => {
      if (e.target.closest(".map-zoom-controls")) return;
      this.isPanning = true;
      this.panStart = { x: e.clientX, y: e.clientY };
      viewport.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isPanning) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = this.viewBox.w / (rect.width || 440);
      const scaleY = this.viewBox.h / (rect.height || 310);
      const dx = (e.clientX - this.panStart.x) * scaleX;
      const dy = (e.clientY - this.panStart.y) * scaleY;

      this.viewBox.x -= dx;
      this.viewBox.y -= dy;
      this.panStart = { x: e.clientX, y: e.clientY };
      this.applyViewBox();
    });

    window.addEventListener("mouseup", () => {
      if (this.isPanning) {
        this.isPanning = false;
        if (viewport) viewport.style.cursor = "grab";
      }
    });

    // Mouse wheel zoom
    viewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.9 : 1.1;
      this.zoom(factor);
    }, { passive: false });

    // Touch gesture pan & pinch-zoom for mobile screens
    let touchStartDist = 0;
    viewport.addEventListener("touchstart", (e) => {
      if (e.target.closest(".map-zoom-controls")) return;
      if (e.touches.length === 1) {
        this.isPanning = true;
        this.panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        this.isPanning = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      if (e.target.closest(".map-zoom-controls")) return;
      if (e.touches.length === 1 && this.isPanning) {
        const rect = svg.getBoundingClientRect();
        const scaleX = this.viewBox.w / (rect.width || 440);
        const scaleY = this.viewBox.h / (rect.height || 310);
        const dx = (e.touches[0].clientX - this.panStart.x) * scaleX;
        const dy = (e.touches[0].clientY - this.panStart.y) * scaleY;

        this.viewBox.x -= dx;
        this.viewBox.y -= dy;
        this.panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.applyViewBox();
        e.preventDefault();
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = touchStartDist / currentDist;
        if (Math.abs(factor - 1) > 0.05) {
          this.zoom(factor > 1 ? 1.05 : 0.95);
          touchStartDist = currentDist;
        }
        e.preventDefault();
      }
    }, { passive: false });

    viewport.addEventListener("touchend", () => {
      this.isPanning = false;
      touchStartDist = 0;
    }, { passive: true });
  }

  zoom(factor) {
    const newW = Math.max(180, Math.min(800, this.viewBox.w * factor));
    const newH = Math.max(120, Math.min(600, this.viewBox.h * factor));
    this.viewBox.x += (this.viewBox.w - newW) / 2;
    this.viewBox.y += (this.viewBox.h - newH) / 2;
    this.viewBox.w = newW;
    this.viewBox.h = newH;
    this.applyViewBox();
  }

  resetZoom() {
    this.viewBox = { ...this.defaultViewBox };
    this.applyViewBox();
  }

  applyViewBox() {
    const svg = this.container.querySelector("#campus-floor-svg");
    if (svg) {
      svg.setAttribute("viewBox", `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
    }
  }

  switchFloor(floor) {
    this.currentFloor = floor;
    const tabBtns = this.container.querySelectorAll(".map-floor-btn");
    tabBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-floor") === floor);
    });

    this.renderFloorGeometry(floor);

    // If a route is active, re-render its segment on the new floor
    if (this.activeRoute) {
      this.renderRouteHighlight();
    }
  }

  /**
   * Clears any active route highlight, markers, and warnings.
   */
  clearRoute() {
    this.activeRoute = null;
    this.activeStepIndex = 0;
    this.activeRouteFloor = null;

    const baseLayer = this.container.querySelector("#map-route-base-layer");
    if (baseLayer) baseLayer.innerHTML = "";

    const activeSegLayer = this.container.querySelector("#map-active-segment-layer");
    if (activeSegLayer) activeSegLayer.innerHTML = "";

    const turnLayer = this.container.querySelector("#map-turn-indicator-layer");
    if (turnLayer) turnLayer.innerHTML = "";

    const markersLayer = this.container.querySelector("#map-markers-layer");
    if (markersLayer) markersLayer.innerHTML = "";

    const hud = this.container.querySelector("#map-nav-hud");
    if (hud) hud.classList.add("hidden");

    this.renderFloorGeometry(this.currentFloor);
  }

  /**
   * Switches the active floor and updates geometry and route overlay.
   */
  switchFloor(floor) {
    if (this.currentFloor === floor) return;
    this.currentFloor = floor;
    this.updateFloorTabSelection(floor);
    this.renderFloorGeometry(floor);
    if (this.activeRoute) {
      this.renderRouteHighlight();
    }
  }

  /**
   * Sets and renders a new verified route.
   */
  setRoute(route) {
    this.clearRoute();

    if (!route || !route.verifiedRouteAvailable) {
      return;
    }

    this.activeRoute = route;
    this.activeStepIndex = 0;

    // Show start floor (Ground Floor)
    this.currentFloor = "G";
    this.updateFloorTabSelection(this.currentFloor);
    this.renderFloorGeometry(this.currentFloor);
    this.renderRouteHighlight();
  }

  updateFloorTabSelection(floor) {
    const tabBtns = this.container.querySelectorAll(".map-floor-btn");
    tabBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-floor") === floor);
    });
  }

  /**
   * Highlights a specific step index on the map.
   */
  highlightStep(stepIndex) {
    if (!this.activeRoute || !this.activeRoute.steps) return;
    this.activeStepIndex = stepIndex;

    const step = this.activeRoute.steps[stepIndex];
    if (step && step.floor && step.floor !== this.currentFloor) {
      this.switchFloor(step.floor);
    } else {
      this.renderRouteHighlight();
    }
  }

  /**
   * First-Person Navigation Engine
   * Renders the route polyline, active segment glow, You Are Here avatar, and directional turn arrows.
   */
  renderRouteHighlight() {
    const baseLayer = this.container.querySelector("#map-route-base-layer");
    const activeSegLayer = this.container.querySelector("#map-active-segment-layer");
    const turnLayer = this.container.querySelector("#map-turn-indicator-layer");
    const markersLayer = this.container.querySelector("#map-markers-layer");
    const hud = this.container.querySelector("#map-nav-hud");

    if (!baseLayer || !markersLayer) return;

    baseLayer.innerHTML = "";
    if (activeSegLayer) activeSegLayer.innerHTML = "";
    if (turnLayer) turnLayer.innerHTML = "";
    markersLayer.innerHTML = "";

    if (!this.activeRoute) {
      if (hud) hud.classList.add("hidden");
      return;
    }

    const segments = this.activeRoute.mapSegments || {};
    const floorPoints = segments[this.currentFloor];
    const currentStep = this.activeRoute.steps ? this.activeRoute.steps[this.activeStepIndex] : null;

    // 1. Update First-Person Navigation HUD
    if (hud && currentStep) {
      hud.classList.remove("hidden");
      const iconBadge = hud.querySelector("#hud-icon-badge");
      const actionTag = hud.querySelector("#hud-action-tag");
      const stepCount = hud.querySelector("#hud-step-count");
      const instruction = hud.querySelector("#hud-instruction");
      const btnPrev = hud.querySelector("#btn-hud-prev");
      const btnNext = hud.querySelector("#btn-hud-next");

      let iconChar = "↑";
      let iconClass = "straight";
      let tagText = "WALK STRAIGHT";

      if (currentStep.action === "TURN_LEFT") {
        iconChar = "↰";
        iconClass = "turn-left";
        tagText = "TURN LEFT";
      } else if (currentStep.action === "TURN_RIGHT") {
        iconChar = "↱";
        iconClass = "turn-right";
        tagText = "TURN RIGHT";
      } else if (currentStep.action === "STAIRS_UP") {
        iconChar = "🪜";
        iconClass = "stairs";
        tagText = `GO UPSTAIRS TO LEVEL ${this.activeRoute.floor}`;
      } else if (currentStep.action === "STAIRS_DOWN") {
        iconChar = "🪜";
        iconClass = "stairs";
        tagText = "GO DOWNSTAIRS";
      } else if (currentStep.action === "ARRIVED" || this.activeStepIndex === this.activeRoute.steps.length - 1) {
        iconChar = "🎯";
        iconClass = "destination";
        tagText = "ARRIVED AT DESTINATION";
      }

      if (iconBadge) {
        iconBadge.className = `nav-hud-icon-badge ${iconClass}`;
        iconBadge.textContent = iconChar;
      }
      if (actionTag) actionTag.textContent = tagText;
      if (stepCount) stepCount.textContent = `Step ${this.activeStepIndex + 1} of ${this.activeRoute.steps.length}`;
      if (instruction) instruction.textContent = currentStep.instruction;
      if (btnPrev) btnPrev.disabled = this.activeStepIndex === 0;
      if (btnNext) btnNext.disabled = this.activeStepIndex === this.activeRoute.steps.length - 1;
    }

    if (!floorPoints || floorPoints.length === 0) {
      baseLayer.innerHTML = `
        <text x="480" y="375" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="500">
          (No path segment on this floor for ${this.activeRoute.destinationCode})
        </text>
      `;
      return;
    }

    // 2. Draw full route polyline for spatial context
    const pointsStr = floorPoints.map((p) => `${p.x},${p.y}`).join(" ");

    const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    glowLine.setAttribute("points", pointsStr);
    glowLine.setAttribute("fill", "none");
    glowLine.setAttribute("stroke", "rgba(185, 28, 28, 0.15)");
    glowLine.setAttribute("stroke-width", "8");
    glowLine.setAttribute("stroke-linecap", "round");
    glowLine.setAttribute("stroke-linejoin", "round");
    baseLayer.appendChild(glowLine);

    const basePath = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    basePath.setAttribute("points", pointsStr);
    basePath.setAttribute("fill", "none");
    basePath.setAttribute("stroke", "#b91c1c");
    basePath.setAttribute("stroke-width", "3.5");
    basePath.setAttribute("stroke-linecap", "round");
    basePath.setAttribute("stroke-linejoin", "round");
    basePath.setAttribute("opacity", "0.45");
    baseLayer.appendChild(basePath);

    // Directional arrows along base segments (context)
    for (let i = 0; i < floorPoints.length - 1; i++) {
      const p1 = floorPoints[i];
      const p2 = floorPoints[i + 1];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (dist < 35) continue;
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
      const arrowG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      arrowG.setAttribute("transform", `translate(${midX}, ${midY}) rotate(${angle})`);
      arrowG.innerHTML = `
        <path d="M -4 -4 L 3 0 L -4 4" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M -4 -4 L 3 0 L -4 4" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" />
      `;
      baseLayer.appendChild(arrowG);
    }

    // 3. Start & Destination markers
    if (this.currentFloor === "G" && floorPoints.length > 0) {
      const startPt = floorPoints[0];
      const startG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      startG.setAttribute("transform", `translate(${startPt.x}, ${startPt.y})`);
      startG.innerHTML = `
        <circle cx="0" cy="0" r="12" fill="rgba(16, 185, 129, 0.25)" />
        <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2" />
      `;
      markersLayer.appendChild(startG);
    }

    if (this.currentFloor === this.activeRoute.floor && floorPoints.length > 0) {
      const destPt = floorPoints[floorPoints.length - 1];
      const destG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      destG.setAttribute("transform", `translate(${destPt.x}, ${destPt.y})`);
      destG.innerHTML = `
        <circle cx="0" cy="0" r="14" fill="rgba(185, 28, 28, 0.25)" />
        <circle cx="0" cy="0" r="8" fill="#b91c1c" stroke="#ffffff" stroke-width="2.5" />
        <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
      `;
      markersLayer.appendChild(destG);
    }

    // 4. First-Person Active Step Navigation (if active step is on this floor)
    if (currentStep && currentStep.floor === this.currentFloor) {
      let startPos = null;
      let targetPos = currentStep.mapPoint;

      if (this.activeStepIndex === 0) {
        startPos = floorPoints[0] || targetPos;
      } else {
        const prevStep = this.activeRoute.steps[this.activeStepIndex - 1];
        if (prevStep && prevStep.floor === this.currentFloor && prevStep.mapPoint) {
          startPos = prevStep.mapPoint;
        } else {
          // Arrived on this floor via stairs
          startPos = floorPoints[0] || targetPos;
        }
      }

      if (!targetPos) {
        targetPos = startPos;
      }

      const dx = targetPos.x - startPos.x;
      const dy = targetPos.y - startPos.y;
      const dist = Math.hypot(dx, dy);

      let headingAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (dist === 0) {
        headingAngle = (this.currentFloor === "3") ? 90 : 0;
      }

      // Highlight active corridor segment
      if (activeSegLayer && dist > 0) {
        const activeLineGlow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        activeLineGlow.setAttribute("x1", startPos.x);
        activeLineGlow.setAttribute("y1", startPos.y);
        activeLineGlow.setAttribute("x2", targetPos.x);
        activeLineGlow.setAttribute("y2", targetPos.y);
        activeLineGlow.setAttribute("stroke", "rgba(245, 158, 11, 0.4)");
        activeLineGlow.setAttribute("stroke-width", "11");
        activeLineGlow.setAttribute("stroke-linecap", "round");
        activeSegLayer.appendChild(activeLineGlow);

        const activeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        activeLine.setAttribute("x1", startPos.x);
        activeLine.setAttribute("y1", startPos.y);
        activeLine.setAttribute("x2", targetPos.x);
        activeLine.setAttribute("y2", targetPos.y);
        activeLine.setAttribute("stroke", "#f59e0b");
        activeLine.setAttribute("stroke-width", "5");
        activeLine.setAttribute("stroke-linecap", "round");
        activeLine.classList.add("active-corridor-highlight");
        activeSegLayer.appendChild(activeLine);
      }

      // Draw "You Are Here" Avatar at startPos with First-Person Heading Pointer
      const avatarG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      avatarG.setAttribute("transform", `translate(${startPos.x}, ${startPos.y})`);
      avatarG.innerHTML = `
        <circle cx="0" cy="0" r="14" fill="rgba(16, 185, 129, 0.25)" class="pulse-radar-ring" />
        <circle cx="0" cy="0" r="8" fill="#10b981" stroke="#ffffff" stroke-width="2.5" />
        <polygon points="0,-14 -5,-7 5,-7" fill="#065f46" stroke="#ffffff" stroke-width="1.2" transform="rotate(${headingAngle + 90}, 0, 0)" />
        <g transform="translate(0, -22)">
          <rect x="-34" y="-12" width="68" height="15" rx="3" fill="#0f172a" opacity="0.92" />
          <text x="0" y="-1.5" text-anchor="middle" fill="#ffffff" font-size="7.5" font-weight="700">📍 You Are Here</text>
        </g>
      `;
      markersLayer.appendChild(avatarG);

      // Render First-Person Next Movement Turn Arrow and Corridor Direction
      if (turnLayer) {
        const turnX = dist > 25 ? (startPos.x + targetPos.x) / 2 : targetPos.x;
        const turnY = dist > 25 ? (startPos.y + targetPos.y) / 2 : targetPos.y;

        // Calculate incoming heading arriving at startPos
        let incomingAngle = headingAngle;
        if (this.activeStepIndex === 0) {
          incomingAngle = -90; // Arriving from porch into lobby facing North
        } else {
          const prevStep = this.activeRoute.steps[this.activeStepIndex - 1];
          if (prevStep && (prevStep.action === "STAIRS_UP" || prevStep.floor !== this.currentFloor)) {
            // Exiting stairs: on Floor 3 Wing E stairs exit facing West (180)
            incomingAngle = (this.currentFloor === "3") ? 180 : 0;
          } else if (prevStep && prevStep.mapPoint) {
            let prevStart = null;
            if (this.activeStepIndex === 1) {
              prevStart = floorPoints[0] || { x: 400, y: 445 };
            } else {
              const prevPrevStep = this.activeRoute.steps[this.activeStepIndex - 2];
              if (prevPrevStep && prevPrevStep.floor === this.currentFloor && prevPrevStep.mapPoint) {
                prevStart = prevPrevStep.mapPoint;
              } else {
                prevStart = floorPoints[0] || prevStep.mapPoint;
              }
            }
            const pdx = prevStep.mapPoint.x - prevStart.x;
            const pdy = prevStep.mapPoint.y - prevStart.y;
            if (Math.hypot(pdx, pdy) > 1) {
              incomingAngle = Math.atan2(pdy, pdx) * (180 / Math.PI);
            }
          }
        }

        if (currentStep.action === "TURN_LEFT") {
          // Curved turn arrow at the decision point (startPos) from incoming perspective
          const turnG = document.createElementNS("http://www.w3.org/2000/svg", "g");
          turnG.setAttribute("transform", `translate(${startPos.x}, ${startPos.y}) rotate(${incomingAngle + 90})`);
          turnG.innerHTML = `
            <path d="M 0 16 L 0 4 Q 0 -6 -10 -6 L -18 -6" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M 0 16 L 0 4 Q 0 -6 -10 -6 L -18 -6" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#active-arrow-marker)" />
          `;
          turnLayer.appendChild(turnG);

          // Forward travel arrow along corridor if segment is long enough
          if (dist > 35) {
            const fwdG = document.createElementNS("http://www.w3.org/2000/svg", "g");
            fwdG.setAttribute("transform", `translate(${turnX}, ${turnY}) rotate(${headingAngle})`);
            fwdG.innerHTML = `
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#2563eb" stroke-width="3" stroke-linecap="round" marker-end="url(#active-arrow-marker)" />
            `;
            turnLayer.appendChild(fwdG);
          }
        } else if (currentStep.action === "TURN_RIGHT") {
          // Curved turn arrow at the decision point (startPos) from incoming perspective
          const turnG = document.createElementNS("http://www.w3.org/2000/svg", "g");
          turnG.setAttribute("transform", `translate(${startPos.x}, ${startPos.y}) rotate(${incomingAngle + 90})`);
          turnG.innerHTML = `
            <path d="M 0 16 L 0 4 Q 0 -6 10 -6 L 18 -6" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M 0 16 L 0 4 Q 0 -6 10 -6 L 18 -6" fill="none" stroke="#d97706" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#active-arrow-marker)" />
          `;
          turnLayer.appendChild(turnG);

          // Forward travel arrow along corridor if segment is long enough
          if (dist > 35) {
            const fwdG = document.createElementNS("http://www.w3.org/2000/svg", "g");
            fwdG.setAttribute("transform", `translate(${turnX}, ${turnY}) rotate(${headingAngle})`);
            fwdG.innerHTML = `
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#d97706" stroke-width="3" stroke-linecap="round" marker-end="url(#active-arrow-marker)" />
            `;
            turnLayer.appendChild(fwdG);
          }
        } else if (currentStep.action === "GO_STRAIGHT" || currentStep.action === "WALK_STEPS" || currentStep.action === "PASS_ROOMS") {
          const turnG = document.createElementNS("http://www.w3.org/2000/svg", "g");
          turnG.setAttribute("transform", `translate(${turnX}, ${turnY}) rotate(${headingAngle})`);
          turnG.innerHTML = `
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#059669" stroke-width="3.5" stroke-linecap="round" marker-end="url(#active-arrow-marker)" />
          `;
          turnLayer.appendChild(turnG);
        } else if (currentStep.action === "STAIRS_UP") {
          const turnG = document.createElementNS("http://www.w3.org/2000/svg", "g");
          turnG.setAttribute("transform", `translate(${startPos.x}, ${startPos.y - 18})`);
          turnG.innerHTML = `
            <rect x="-44" y="-13" width="88" height="22" rx="4" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
            <text x="0" y="2" text-anchor="middle" fill="#ffffff" font-size="8" font-weight="800">🪜 Go to Level ${this.activeRoute.floor}</text>
          `;
          turnLayer.appendChild(turnG);
        } else if (currentStep.action === "ARRIVED" || this.activeStepIndex === this.activeRoute.steps.length - 1) {
          const turnG = document.createElementNS("http://www.w3.org/2000/svg", "g");
          turnG.setAttribute("transform", `translate(${targetPos.x}, ${targetPos.y - 18})`);
          turnG.innerHTML = `
            <rect x="-38" y="-13" width="76" height="20" rx="4" fill="#047857" stroke="#ffffff" stroke-width="1.5" />
            <text x="0" y="1" text-anchor="middle" fill="#ffffff" font-size="8" font-weight="800">✓ ${this.activeRoute.destinationCode}</text>
          `;
          turnLayer.appendChild(turnG);
        }
      }
    }
  }

  /**
   * Renders the floor corridors, rooms, and department landmarks.
   */
  renderFloorGeometry(floor) {
    const geo = this.container.querySelector("#map-floor-geometry");
    if (!geo) return;

    if (floor === "G") {
      geo.innerHTML = this.getGroundFloorSVG();
    } else if (floor === "1") {
      geo.innerHTML = this.getFirstFloorSVG();
    } else if (floor === "2") {
      geo.innerHTML = this.getSecondFloorSVG();
    } else if (floor === "3") {
      geo.innerHTML = this.getThirdFloorSVG();
    }
  }

  getGroundFloorSVG() {
    return `
      <!-- Main Entrance Connecting Corridor East towards Wing E (Solid, clean corridor) -->
      <rect x="390" y="415" width="150" height="30" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />

      <!-- Hallway West towards Ganesh Statue and Stairs -->
      <rect x="325" y="415" width="70" height="30" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />

      <!-- Wing E Main Hallway Corridor -->
      <rect x="535" y="305" width="30" height="205" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <text x="550" y="522" text-anchor="middle" fill="#475569" font-size="8.5" font-weight="700">Wing E Hallway</text>

      <!-- Main Entrance Porch & Lobby Area -->
      <rect x="365" y="445" width="70" height="40" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" rx="4" />
      <text x="400" y="468" text-anchor="middle" fill="#475569" font-size="8.5" font-weight="700">Main Entrance</text>

      <!-- Ganesh Statue on Left -->
      <rect x="320" y="445" width="36" height="36" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2" rx="4" />
      <text x="338" y="462" text-anchor="middle" fill="#b45309" font-size="12">🕉️</text>
      <text x="338" y="474" text-anchor="middle" fill="#78350f" font-size="7" font-weight="700">Ganesh Statue</text>

      <!-- Staircase on Left near Ganesh Statue -->
      <rect x="295" y="375" width="35" height="42" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" rx="4" />
      <text x="312" y="394" text-anchor="middle" fill="#6d28d9" font-size="12">🪜</text>
      <text x="312" y="408" text-anchor="middle" fill="#5b21b6" font-size="7.5" font-weight="700">Staircase</text>

      <!-- Mechanical Engineering Board (Mounted cleanly on corridor wall, non-overlapping) -->
      <rect x="355" y="392" width="110" height="18" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="3" />
      <text x="410" y="404.5" text-anchor="middle" fill="#fbbf24" font-size="7.5" font-weight="700">📋 Mechanical Engg Board</text>

      <!-- Wing E Rooms (Ground Floor) -->
      <!-- Left / West Rooms (E101, E102) -->
      <rect x="475" y="370" width="60" height="32" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="505" y="386" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E101</text>
      <text x="505" y="396" text-anchor="middle" fill="#64748b" font-size="7">FY B.Tech</text>

      <rect x="475" y="330" width="60" height="32" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="505" y="346" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E102</text>
      <text x="505" y="356" text-anchor="middle" fill="#64748b" font-size="7">Classroom II</text>

      <!-- North branch rooms (E103-I, E103-II) -->
      <rect x="565" y="315" width="65" height="28" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="331" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E103-I</text>
      <text x="597" y="339" text-anchor="middle" fill="#64748b" font-size="6.5">Mechatronics</text>

      <rect x="635" y="315" width="65" height="28" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="331" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E103-II</text>
      <text x="667" y="339" text-anchor="middle" fill="#64748b" font-size="6.5">Design Software</text>

      <!-- South branch rooms (E106-I, E106-II, E108-I, E108-II) -->
      <rect x="565" y="440" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="455" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E106-I</text>
      <text x="597" y="463" text-anchor="middle" fill="#64748b" font-size="6.5">IC Engine</text>

      <rect x="635" y="440" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="455" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E106-II</text>
      <text x="667" y="463" text-anchor="middle" fill="#64748b" font-size="6.5">Tutorial Room</text>

      <rect x="565" y="472" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="487" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E108-I</text>
      <text x="597" y="495" text-anchor="middle" fill="#64748b" font-size="6.5">TOM Lab</text>

      <rect x="635" y="472" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="487" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E108-II</text>
      <text x="667" y="495" text-anchor="middle" fill="#64748b" font-size="6.5">Fluid Machinery</text>

      <!-- Wing E Staircase to upper floors -->
      <rect x="535" y="270" width="30" height="35" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.2" rx="4" />
      <text x="550" y="288" text-anchor="middle" fill="#6d28d9" font-size="11">🪜</text>
      <text x="550" y="300" text-anchor="middle" fill="#5b21b6" font-size="7" font-weight="700">Wing E Stairs</text>
    `;
  }

  getFirstFloorSVG() {
    return `
      <!-- Staircase Landing on 1st Floor (From Ganesh Statue Stairs) -->
      <rect x="295" y="375" width="35" height="42" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" rx="4" />
      <text x="312" y="394" text-anchor="middle" fill="#6d28d9" font-size="12">🪜</text>
      <text x="312" y="408" text-anchor="middle" fill="#5b21b6" font-size="7" font-weight="700">1st Floor Landing</text>

      <!-- 1st Floor Hallway Corridor East towards Wing E (Solid, clean corridor) -->
      <rect x="330" y="395" width="205" height="30" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />

      <!-- Mechanical Engineering Board (Mounted on wall above corridor) -->
      <rect x="355" y="372" width="110" height="18" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="3" />
      <text x="410" y="384.5" text-anchor="middle" fill="#fbbf24" font-size="7.5" font-weight="700">📋 Mechanical Engg Board</text>

      <!-- Wing E Corridor (1st Floor) -->
      <rect x="535" y="305" width="30" height="205" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <text x="550" y="522" text-anchor="middle" fill="#475569" font-size="8.5" font-weight="700">Wing E 1st Floor</text>

      <!-- Rooms: E201, E202 on Left -->
      <rect x="475" y="360" width="60" height="30" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="505" y="376" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E201</text>
      <text x="505" y="385" text-anchor="middle" fill="#64748b" font-size="7">Classroom 1</text>

      <rect x="475" y="325" width="60" height="30" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="505" y="341" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E202</text>
      <text x="505" y="350" text-anchor="middle" fill="#64748b" font-size="7">Classroom 2</text>

      <!-- North branch rooms: E203-I, E203-II -->
      <rect x="565" y="315" width="65" height="28" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="331" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E203-I</text>
      <text x="597" y="339" text-anchor="middle" fill="#64748b" font-size="6.5">Mechanical</text>

      <rect x="635" y="315" width="65" height="28" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="331" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E203-II</text>
      <text x="667" y="339" text-anchor="middle" fill="#64748b" font-size="6.5">Mechanical</text>

      <!-- South branch rooms: E206-I, E206-II, E208-I, E208-II -->
      <rect x="565" y="440" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="455" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E206-I</text>
      <text x="597" y="463" text-anchor="middle" fill="#64748b" font-size="6.5">Heat Transfer</text>

      <rect x="635" y="440" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="455" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E206-II</text>
      <text x="667" y="463" text-anchor="middle" fill="#64748b" font-size="6.5">RAC Lab</text>

      <rect x="565" y="470" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="485" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E208-I</text>
      <text x="597" y="493" text-anchor="middle" fill="#64748b" font-size="6.5">Simulation</text>

      <rect x="635" y="470" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="485" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E208-II</text>
      <text x="667" y="493" text-anchor="middle" fill="#64748b" font-size="6.5">Classroom</text>
    `;
  }

  getSecondFloorSVG() {
    return `
      <!-- Staircase Landing on 2nd Floor (From Ganesh Statue Stairs) -->
      <rect x="295" y="375" width="35" height="42" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" rx="4" />
      <text x="312" y="394" text-anchor="middle" fill="#6d28d9" font-size="12">🪜</text>
      <text x="312" y="408" text-anchor="middle" fill="#5b21b6" font-size="7" font-weight="700">2nd Floor Landing</text>

      <!-- 2nd Floor Hallway Corridor East towards Computer Engg (Solid, clean corridor) -->
      <rect x="330" y="395" width="205" height="30" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />

      <!-- Computer Engineering Board (Mounted on wall above corridor) -->
      <rect x="355" y="372" width="110" height="18" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="3" />
      <text x="410" y="384.5" text-anchor="middle" fill="#38bdf8" font-size="7.5" font-weight="700">📋 Computer Engg Board</text>

      <!-- Wing E Corridor (2nd Floor - Computer Dept) -->
      <rect x="535" y="305" width="30" height="205" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <text x="550" y="522" text-anchor="middle" fill="#475569" font-size="8.5" font-weight="700">Wing E 2nd Floor</text>

      <!-- Rooms: E301, E302 on Left -->
      <rect x="475" y="360" width="60" height="30" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="505" y="376" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E301</text>
      <text x="505" y="385" text-anchor="middle" fill="#64748b" font-size="7">Classroom 1</text>

      <rect x="475" y="325" width="60" height="30" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="505" y="341" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E302</text>
      <text x="505" y="350" text-anchor="middle" fill="#64748b" font-size="7">Classroom 2</text>

      <!-- North branch rooms: E303-I, E303-II -->
      <rect x="565" y="315" width="65" height="28" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="331" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E303-I</text>
      <text x="597" y="339" text-anchor="middle" fill="#64748b" font-size="6.5">Programming I</text>

      <rect x="635" y="315" width="65" height="28" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="331" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E303-II</text>
      <text x="667" y="339" text-anchor="middle" fill="#64748b" font-size="6.5">Programming II</text>

      <!-- South branch rooms: E306-I, E306-II, E308-I, E308-II -->
      <rect x="565" y="440" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="455" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E306-I</text>
      <text x="597" y="463" text-anchor="middle" fill="#64748b" font-size="6.5">Programming III</text>

      <rect x="635" y="440" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="455" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E306-II</text>
      <text x="667" y="463" text-anchor="middle" fill="#64748b" font-size="6.5">Programming IV</text>

      <rect x="565" y="470" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="597" y="485" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E308-I</text>
      <text x="597" y="493" text-anchor="middle" fill="#64748b" font-size="6.5">Tutorial Lab</text>

      <rect x="635" y="470" width="65" height="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="667" y="485" text-anchor="middle" fill="#1e293b" font-size="8.5" font-weight="700">E308-II</text>
      <text x="667" y="493" text-anchor="middle" fill="#64748b" font-size="6.5">Project Lab</text>
    `;
  }

  getThirdFloorSVG() {
    return `
      <!-- Wing E Staircase Landing on 3rd Floor -->
      <rect x="535" y="275" width="30" height="35" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" rx="4" />
      <text x="550" y="293" text-anchor="middle" fill="#6d28d9" font-size="11">🪜</text>
      <text x="550" y="304" text-anchor="middle" fill="#5b21b6" font-size="7" font-weight="700">3rd Floor Stairs</text>

      <!-- Department of Computer Engineering Board (Wall Mounted) -->
      <rect x="420" y="318" width="115" height="18" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="4" />
      <text x="477" y="330" text-anchor="middle" fill="#fbbf24" font-size="7.5" font-weight="700">📋 Dept of Computer Engg Board</text>

      <!-- North Corridor (Route E / E403 Route 2) -->
      <rect x="535" y="235" width="30" height="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <rect x="350" y="235" width="200" height="26" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <text x="440" y="251" text-anchor="middle" fill="#64748b" font-size="8">North Corridor</text>

      <!-- Wing E Main Corridor (3rd Floor) -->
      <rect x="535" y="310" width="30" height="170" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <text x="550" y="495" text-anchor="middle" fill="#475569" font-size="8.5" font-weight="700">Wing E 3rd Floor</text>

      <!-- West Hallway (Leading to E403, Washroom, E406) -->
      <rect x="415" y="338" width="120" height="26" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <rect x="475" y="364" width="28" height="96" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />
      <rect x="415" y="432" width="60" height="26" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2" />

      <!-- E402 (1st room on right of board corridor) -->
      <rect x="565" y="365" width="60" height="30" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="595" y="382" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E402</text>
      <text x="595" y="391" text-anchor="middle" fill="#64748b" font-size="6.8">1st room on right</text>

      <!-- E401 (2nd room on right of board corridor) -->
      <rect x="565" y="405" width="60" height="30" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="595" y="422" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E401</text>
      <text x="595" y="431" text-anchor="middle" fill="#64748b" font-size="6.8">2nd room on right</text>

      <!-- E403 (Room on left-hand side of board) -->
      <rect x="350" y="325" width="65" height="40" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="382" y="345" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E403</text>
      <text x="382" y="355" text-anchor="middle" fill="#64748b" font-size="6.8">Room on left side</text>

      <!-- Washroom on 3rd Floor -->
      <rect x="503" y="430" width="46" height="26" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="526" y="446" text-anchor="middle" fill="#475569" font-size="7.5" font-weight="600">🚻 Washroom</text>

      <!-- E406 (Destination on left after washroom) -->
      <rect x="350" y="425" width="65" height="40" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" rx="3" />
      <text x="382" y="445" text-anchor="middle" fill="#1e293b" font-size="9" font-weight="700">E406</text>
      <text x="382" y="455" text-anchor="middle" fill="#64748b" font-size="6.8">Destination on left</text>
    `;
  }
}
