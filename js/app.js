/**
 * Main Application Controller
 * KKWIEER Main Building Indoor Navigation & Campus Directory
 * 
 * Strict Source of Truth: 26 Verified Routes
 * Interactive Floor Map, Standardized Navigation Symbols, Multi-floor Transitions
 */

import { CAMPUS_DIRECTORY, FLOOR_INFO } from "./data/campus-directory.js";
import { NODES } from "./data/building-graph.js";
import { calculateRoute, VALIDATION_REPORT, NAVIGATION_SYMBOLS, getVerifiedRoute } from "./services/pathfinder.js";
import { voiceGuidance } from "./services/voice-guidance.js";
import { Autocomplete } from "./components/autocomplete.js";
import { FloorMap } from "./components/floor-map.js";

class CampusNavigatorApp {
  constructor() {
    this.currentOriginId = "MAIN-ENT";
    this.currentDestId = null;
    this.selectedVariant = 1;
    this.activeRoute = null;
    this.activeStepIndex = 0;

    // Explorer State
    this.selectedFloor = "G";
    this.selectedWingFilter = "ALL";
    this.directorySearchQuery = "";
    this.currentViewMode = "map"; // Default view: Interactive Floor Map

    this.initDOMElements();
    this.initFloorMap();
    this.initAutocompletes();
    this.initEventListeners();
    this.renderFloorExplorer();
    this.initVoiceGuidance();
  }

  initDOMElements() {
    // Inputs & Autocomplete
    this.inputOrigin = document.getElementById("input-origin");
    this.inputDest = document.getElementById("input-dest");
    this.dropdownOrigin = document.getElementById("origin-suggestions");
    this.dropdownDest = document.getElementById("dest-suggestions");
    this.btnClearOrigin = document.getElementById("btn-clear-origin");
    this.btnClearDest = document.getElementById("btn-clear-dest");
    this.btnSwap = document.getElementById("btn-swap-locations");

    // Action Buttons
    this.btnFindRoute = document.getElementById("btn-find-route");
    this.btnClearRoute = document.getElementById("btn-clear-route");

    // Route Summary & Steps
    this.routeSummaryCard = document.getElementById("route-summary-card");
    this.routeVariantBar = document.getElementById("route-variant-bar");
    this.metricDuration = document.getElementById("metric-duration");
    this.metricDistance = document.getElementById("metric-distance-text");
    this.metricFloorText = document.getElementById("metric-floor-text");
    this.stepCounterText = document.getElementById("step-counter-text");
    this.activeWingIndicator = document.getElementById("active-wing-indicator");
    this.stepProgressFill = document.getElementById("step-progress-fill");

    this.btnPrevStep = document.getElementById("btn-prev-step");
    this.btnNextStep = document.getElementById("btn-next-step");
    this.btnVoiceCurrentStep = document.getElementById("btn-voice-current-step");
    this.btnReadAllAloud = document.getElementById("btn-read-aloud");
    this.btnShareRoute = document.getElementById("btn-share-route");

    this.emptyStateIntro = document.getElementById("empty-state-intro");
    this.turnCardsList = document.getElementById("turn-cards-list");

    // Explorer Elements
    this.floorPillsContainer = document.getElementById("floor-pills");
    this.floorSummaryBanner = document.getElementById("floor-summary-banner");
    this.directoryFilterBar = document.getElementById("directory-filter-bar");
    this.directoryFilterInput = document.getElementById("directory-filter-input");
    this.btnClearDirFilter = document.getElementById("btn-clear-dir-filter");
    this.wingFilterPills = document.getElementById("wing-filter-pills");
    this.directoryRoomGrid = document.getElementById("directory-room-grid");

    // View Modes
    this.viewModeMap = document.getElementById("view-mode-map");
    this.viewModeDirectory = document.getElementById("view-mode-directory");
    this.interactiveMapArea = document.getElementById("interactive-map-area");
    this.directoryContentArea = document.getElementById("directory-content-area");

    // Header & Modals
    this.btnValidationReport = document.getElementById("btn-validation-report");
    this.validationModal = document.getElementById("validation-modal");
    this.btnCloseValidationModal = document.getElementById("btn-close-validation-modal");

    this.btnQuickGuide = document.getElementById("btn-quick-guide");
    this.guideModal = document.getElementById("guide-modal");
    this.btnCloseModal = document.getElementById("btn-close-modal");
    this.btnVoiceToggle = document.getElementById("btn-voice-toggle");
    this.voiceHeaderLabel = document.getElementById("voice-header-label");

    // Toast
    this.toast = document.getElementById("toast");
    this.toastMessage = document.getElementById("toast-message");
  }

  initFloorMap() {
    this.floorMap = new FloorMap({
      container: document.getElementById("floor-map-container"),
      onStepSelect: (idx) => this.setActiveStep(idx, true)
    });
  }

  initAutocompletes() {
    this.originAutocomplete = new Autocomplete({
      inputEl: this.inputOrigin,
      dropdownEl: this.dropdownOrigin,
      clearBtnEl: this.btnClearOrigin,
      initialNodeId: "MAIN-ENT",
      onSelect: (item) => {
        this.currentOriginId = item ? item.id : null;
        this.recalculateRoute();
      }
    });

    this.destAutocomplete = new Autocomplete({
      inputEl: this.inputDest,
      dropdownEl: this.dropdownDest,
      clearBtnEl: this.btnClearDest,
      onSelect: (item) => {
        this.currentDestId = item ? item.id : null;
        this.recalculateRoute();
      }
    });
  }

  initEventListeners() {
    // Swap Origin and Destination
    this.btnSwap.addEventListener("click", () => this.swapLocations());

    // Find Route Button
    if (this.btnFindRoute) {
      this.btnFindRoute.addEventListener("click", () => {
        if (!this.currentDestId) {
          this.inputDest.focus();
          this.showToast("Please enter or select a destination first.");
          return;
        }
        this.recalculateRoute();
      });
    }

    // Clear Route Button
    if (this.btnClearRoute) {
      this.btnClearRoute.addEventListener("click", () => {
        this.destAutocomplete.clear();
        this.currentDestId = null;
        this.clearRouteUI();
        this.showToast("Route cleared.");
      });
    }

    // Quick Destination Buttons (Direct Stops)
    document.querySelectorAll(".quick-dest-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const destId = btn.getAttribute("data-dest-id");
        const variant = parseInt(btn.getAttribute("data-variant") || "1", 10);
        this.selectedVariant = variant;
        this.setDestinationById(destId, variant);
      });
    });

    // Preset buttons in intro
    document.querySelectorAll(".preset-tag").forEach((btn) => {
      btn.addEventListener("click", () => {
        const destId = btn.getAttribute("data-dest-id");
        const variant = parseInt(btn.getAttribute("data-variant") || "1", 10);
        this.selectedVariant = variant;
        this.setDestinationById(destId, variant);
      });
    });

    // Step navigator buttons
    this.btnPrevStep.addEventListener("click", () => this.goToStep(this.activeStepIndex - 1));
    this.btnNextStep.addEventListener("click", () => this.goToStep(this.activeStepIndex + 1));
    this.btnVoiceCurrentStep.addEventListener("click", () => {
      if (this.activeRoute && this.activeRoute.steps[this.activeStepIndex]) {
        voiceGuidance.speakStep(this.activeRoute.steps[this.activeStepIndex], this.activeStepIndex);
      }
    });

    // Read all aloud
    this.btnReadAllAloud.addEventListener("click", () => {
      if (this.activeRoute) {
        if (voiceGuidance.isSpeaking) {
          voiceGuidance.stop();
        } else {
          voiceGuidance.speakRoute(this.activeRoute.steps);
        }
      }
    });

    // Share / Copy route
    this.btnShareRoute.addEventListener("click", () => this.copyRouteLink());

    // Floor Selector in Explorer Header
    this.floorPillsContainer.querySelectorAll(".floor-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        this.floorPillsContainer.querySelectorAll(".floor-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.selectedFloor = pill.getAttribute("data-floor");
        this.renderFloorExplorer();

        // Also notify floor map if on map view
        if (this.currentViewMode === "map" && this.floorMap) {
          this.floorMap.switchFloor(this.selectedFloor);
        }
      });
    });

    // Wing Filter Pills
    this.wingFilterPills.querySelectorAll(".wing-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        this.wingFilterPills.querySelectorAll(".wing-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.selectedWingFilter = pill.getAttribute("data-wing");
        this.renderFloorExplorer();
      });
    });

    // Directory Search Filter
    this.directoryFilterInput.addEventListener("input", (e) => {
      this.directorySearchQuery = e.target.value.trim().toLowerCase();
      this.btnClearDirFilter.classList.toggle("hidden", this.directorySearchQuery === "");
      this.renderFloorExplorer();
    });

    this.btnClearDirFilter.addEventListener("click", () => {
      this.directoryFilterInput.value = "";
      this.directorySearchQuery = "";
      this.btnClearDirFilter.classList.add("hidden");
      this.renderFloorExplorer();
      this.directoryFilterInput.focus();
    });

    // View Mode Toggle (Map, Directory)
    if (this.viewModeMap) {
      this.viewModeMap.addEventListener("click", () => this.setViewMode("map"));
    }
    if (this.viewModeDirectory) {
      this.viewModeDirectory.addEventListener("click", () => this.setViewMode("directory"));
    }

    // Validation Report Modal
    if (this.btnValidationReport) {
      this.btnValidationReport.addEventListener("click", () => this.openValidationModal());
    }
    if (this.btnCloseValidationModal) {
      this.btnCloseValidationModal.addEventListener("click", () => this.closeValidationModal());
    }
    if (this.validationModal) {
      this.validationModal.addEventListener("click", (e) => {
        if (e.target === this.validationModal) this.closeValidationModal();
      });

      // Quick Route Pills inside Validation Modal
      this.validationModal.querySelectorAll(".btn-route-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          const destId = btn.getAttribute("data-dest-id");
          const variant = parseInt(btn.getAttribute("data-variant") || "1", 10);
          this.selectedVariant = variant;
          this.closeValidationModal();
          this.setDestinationById(destId, variant);
        });
      });
    }

    // Modal Guide
    this.btnQuickGuide.addEventListener("click", () => this.openGuideModal());
    this.btnCloseModal.addEventListener("click", () => this.closeGuideModal());
    this.guideModal.addEventListener("click", (e) => {
      if (e.target === this.guideModal) this.closeGuideModal();
    });

    // Keyboard ESC to close modals
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.guideModal && !this.guideModal.classList.contains("hidden")) {
          this.closeGuideModal();
        }
        if (this.validationModal && !this.validationModal.classList.contains("hidden")) {
          this.closeValidationModal();
        }
      }
    });

    // Voice Toggle in header
    this.btnVoiceToggle.addEventListener("click", () => {
      const enabled = voiceGuidance.toggleVoiceEnabled();
      this.voiceHeaderLabel.textContent = enabled ? "Voice On" : "Voice Off";
      this.btnVoiceToggle.classList.toggle("active", enabled);
      this.showToast(enabled ? "Voice guidance enabled" : "Voice guidance muted");
    });
  }

  initVoiceGuidance() {
    voiceGuidance.setCallbacks({
      onStepHighlight: (index) => {
        this.setActiveStep(index, false);
      },
      onStateChange: ({ isSpeaking, isEnabled }) => {
        if (isSpeaking) {
          this.btnVoiceToggle.classList.add("speaking");
          this.btnReadAllAloud.classList.add("speaking");
        } else {
          this.btnVoiceToggle.classList.remove("speaking");
          this.btnReadAllAloud.classList.remove("speaking");
        }
      }
    });
  }

  swapLocations() {
    const tempOriginId = this.currentOriginId;
    const tempDestId = this.currentDestId;

    const originItem = this.originAutocomplete.selectedItem;
    const destItem = this.destAutocomplete.selectedItem;

    if (destItem) {
      this.originAutocomplete.setSelection(destItem, false);
      this.currentOriginId = destItem.id;
    } else {
      this.originAutocomplete.clear();
      this.currentOriginId = null;
    }

    if (originItem) {
      this.destAutocomplete.setSelection(originItem, false);
      this.currentDestId = originItem.id;
    } else {
      this.destAutocomplete.clear();
      this.currentDestId = null;
    }

    this.recalculateRoute();
  }

  setDestinationById(destId, variant = 1) {
    this.selectedVariant = variant;
    let item = CAMPUS_DIRECTORY.find((r) => r.id === destId || r.code === destId);
    if (!item) {
      item = {
        id: destId,
        code: destId,
        name: `Room ${destId}`,
        floor: destId.startsWith("E1") ? "G" : destId.startsWith("E2") ? "1" : destId.startsWith("E3") ? "2" : "3",
        wing: "E",
        department: destId.startsWith("E1") || destId.startsWith("E2") ? "Mechanical Engineering" : "Computer Engineering"
      };
    }
    this.destAutocomplete.setSelection(item, true);
  }

  setOriginById(originId) {
    const item = CAMPUS_DIRECTORY.find((r) => r.id === originId);
    if (item) {
      this.originAutocomplete.setSelection(item, true);
    }
  }

  /**
   * Recalculates route using strict Source of Truth rules.
   * If route is not verified, displays "Verified route not available" without guessing.
   */
  recalculateRoute(variant = this.selectedVariant) {
    voiceGuidance.stop();

    if (!this.currentOriginId || !this.currentDestId) {
      this.clearRouteUI();
      return;
    }

    const route = calculateRoute(this.currentOriginId, this.currentDestId, variant);

    // STRICT SOURCE OF TRUTH CHECK:
    if (!route || !route.verifiedRouteAvailable) {
      this.showUnverifiedRouteUI();
      return;
    }

    this.activeRoute = route;
    this.selectedVariant = route.variant || 1;
    this.activeStepIndex = 0;
    this.renderRouteUI();

    // Render interactive floor map with highlighted route
    if (this.floorMap) {
      this.floorMap.setRoute(this.activeRoute);
    }

    // Default to Interactive Floor Map view when route is calculated
    this.setViewMode("map");

    // Auto-sync directory tab with destination floor
    if (route.floor) {
      this.selectedFloor = route.floor;
      this.floorPillsContainer.querySelectorAll(".floor-pill").forEach((pill) => {
        pill.classList.toggle("active", pill.getAttribute("data-floor") === route.floor);
      });
      this.renderFloorExplorer();
    }
  }

  /**
   * Displays "Verified route not available" state as required by PART A.1
   */
  showUnverifiedRouteUI() {
    this.activeRoute = null;
    if (this.floorMap) {
      this.floorMap.clearRoute();
    }

    this.emptyStateIntro.classList.add("hidden");
    this.routeSummaryCard.classList.add("hidden");
    if (this.routeVariantBar) {
      this.routeVariantBar.classList.add("hidden");
      this.routeVariantBar.innerHTML = "";
    }
    this.turnCardsList.classList.remove("hidden");

    const originName = this.inputOrigin.value || "Selected Origin";
    const destName = this.inputDest.value || "Selected Destination";

    this.turnCardsList.innerHTML = `
      <div class="unverified-route-alert">
        <strong>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Verified route not available
        </strong>
        <p>A physically verified indoor navigation path is not currently available between <strong>${originName}</strong> and <strong>${destName}</strong>.</p>
        <p style="margin-top: 0.35rem; font-size: 0.8rem; color: #78350f;">
          Under strict institutional source-of-truth guidelines, unverified corridors or doors are not guessed or automatically generated.
        </p>
        <div style="margin-top: 0.75rem; font-size: 0.82rem; font-weight: 600; color: #92400e;">
          Try one of the verified destinations from Main Entrance Lobby:
        </div>
        <div class="preset-pill-group" style="margin-top: 0.4rem;">
          <button class="preset-tag" data-dest-id="E101">🎯 E101 (R1)</button>
          <button class="preset-tag" data-dest-id="E102">🎯 E102 (R2)</button>
          <button class="preset-tag" data-dest-id="E201">🎯 E201 (R9)</button>
          <button class="preset-tag" data-dest-id="E301">🎯 E301 (R17)</button>
          <button class="preset-tag" data-dest-id="E401">🎯 E401 (R25)</button>
          <button class="preset-tag" data-dest-id="E402">🎯 E402 (R26)</button>
          <button class="preset-tag" data-dest-id="E403" data-variant="1">🎯 E403 R1 (R27)</button>
          <button class="preset-tag" data-dest-id="E403" data-variant="2">🎯 E403 R2 (R29)</button>
          <button class="preset-tag" data-dest-id="E406">🎯 E406 (R28)</button>
        </div>
      </div>
    `;

    // Reattach listeners to preset buttons
    this.turnCardsList.querySelectorAll(".preset-tag").forEach((btn) => {
      btn.addEventListener("click", () => {
        const destId = btn.getAttribute("data-dest-id");
        const variant = parseInt(btn.getAttribute("data-variant") || "1", 10);
        this.selectedVariant = variant;
        this.setDestinationById(destId, variant);
      });
    });

    this.showToast("Verified route not available for this location.");
  }

  clearRouteUI() {
    this.activeRoute = null;
    if (this.floorMap) {
      this.floorMap.clearRoute();
    }
    this.routeSummaryCard.classList.add("hidden");
    if (this.routeVariantBar) {
      this.routeVariantBar.classList.add("hidden");
      this.routeVariantBar.innerHTML = "";
    }
    this.turnCardsList.classList.add("hidden");
    this.emptyStateIntro.classList.remove("hidden");
  }

  renderRouteUI() {
    if (!this.activeRoute) return;

    this.emptyStateIntro.classList.add("hidden");
    this.routeSummaryCard.classList.remove("hidden");
    this.turnCardsList.classList.remove("hidden");

    // Render Route Variants Bar if multi-route destination (e.g. E403 Route 1 vs Route 2)
    if (this.routeVariantBar) {
      if (this.activeRoute.availableVariants && this.activeRoute.availableVariants.length > 1) {
        this.routeVariantBar.classList.remove("hidden");
        this.routeVariantBar.innerHTML = `
          <div class="variant-selector-box">
            <div class="variant-selector-header">
              <span class="variant-selector-badge">🔀 Alternate Route</span>
              <span class="variant-selector-title">Supplied Routes for ${this.activeRoute.destinationCode}:</span>
            </div>
            <div class="variant-btn-group">
              ${this.activeRoute.availableVariants.map((v) => `
                <button class="btn-variant-toggle ${v.variant === this.activeRoute.variant ? 'active' : ''}" data-variant="${v.variant}">
                  <strong>${v.label}</strong>
                  <span class="variant-desc">${v.description}</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;

        this.routeVariantBar.querySelectorAll(".btn-variant-toggle").forEach((btn) => {
          btn.addEventListener("click", () => {
            const v = parseInt(btn.getAttribute("data-variant"), 10);
            this.recalculateRoute(v);
          });
        });
      } else {
        this.routeVariantBar.classList.add("hidden");
        this.routeVariantBar.innerHTML = "";
      }
    }

    // Update Metric Badges
    this.metricDuration.textContent = `${this.activeRoute.totalDurationMinutes} min walk`;
    this.metricDistance.textContent = `${this.activeRoute.totalDistance} meters`;

    if (this.activeRoute.floorDifference === 0) {
      this.metricFloorText.textContent = "Same Floor";
    } else {
      this.metricFloorText.textContent = `Climb ${this.activeRoute.floorDifference} Floor${this.activeRoute.floorDifference > 1 ? "s" : ""}`;
    }

    // Header Card for Selected Route (PART A.4 Requirements)
    const statusBadgeClass = this.activeRoute.validationStatus === "VERIFIED" ? "verified" : "needs-confirmation";
    const statusBadgeText = this.activeRoute.validationStatus === "VERIFIED" ? "✓ Verified Route" : "⚠️ Needs Confirmation";

    let headerHtml = `
      <div class="route-header-card">
        <div class="route-header-item">
          <span class="route-header-label">📍 Start:</span>
          <span class="route-header-value">${this.activeRoute.startPointName || "Main Entrance Lobby"}</span>
        </div>
        <div class="route-header-item">
          <span class="route-header-label">🎯 Destination:</span>
          <span class="route-header-value">${this.activeRoute.destinationName} (${this.activeRoute.destinationCode})</span>
          <span class="route-header-status-badge ${statusBadgeClass}">${statusBadgeText}</span>
        </div>
        <div class="route-header-item">
          <span class="route-header-label">🏢 Floor:</span>
          <span class="route-header-value">${this.activeRoute.floorLabel}</span>
          <span style="color: var(--color-muted); font-size: 0.8rem;">• ${this.activeRoute.department}</span>
        </div>
        ${
          this.activeRoute.variant && this.activeRoute.availableVariants && this.activeRoute.availableVariants.length > 1
            ? `
            <div class="route-variant-tag-row">
              <span class="variant-active-tag">Active: Route ${this.activeRoute.variant}</span>
            </div>
            `
            : ""
        }
        ${
          this.activeRoute.validationStatus === "NEEDS_CONFIRMATION"
            ? `
            <div class="validation-banner" style="margin-top: 0.35rem;">
              <span class="validation-badge-warn">⚠️ Needs Confirmation</span>
              <span class="validation-text">${this.activeRoute.validationNote || "Discrepancy flagged in route notes; review required."}</span>
            </div>
          `
            : ""
        }
      </div>
    `;

    // Render Numbered Turn Cards with Action Symbols (PART A.2 & A.4 Requirements)
    const totalStepsCount = this.activeRoute.steps.length;
    const cardsHtml = this.activeRoute.steps
      .map((step, idx) => {
        const floorChangeClass = step.isFloorChange ? "floor-change" : "";
        const activeClass = idx === 0 ? "active-step" : "";
        const wingBadge = step.wing && step.wing !== "CENTRAL" ? `Wing ${step.wing}` : "Central Lobby";
        const stepsWalked = step.stepsEstimate ? `~${step.stepsEstimate} steps` : "";

        return `
          <div class="turn-card ${floorChangeClass} ${activeClass}" data-step-index="${idx}">
            <div class="step-icon-badge ${step.iconClass}" aria-hidden="true">
              ${step.icon}
            </div>
            <div class="step-details">
              <div class="step-meta">
                <span class="step-action-pill pill-${step.type}">${step.symbol || step.actionTag}</span>
                <span class="step-index-tag">Step ${step.stepNumber} of ${totalStepsCount}</span>
                <span>•</span>
                <span>${wingBadge}</span>
              </div>
              <div class="step-instruction">
                <strong>${step.stepNumber}.</strong> ${step.instruction}
              </div>
              ${step.landmark ? `<div class="step-landmark-note"><span class="tip-icon">💡</span> <span>Landmark: ${step.landmark}</span></div>` : ""}
            </div>
            <div class="step-distance-col">
              <div class="step-metric-badge">
                ${step.distance > 0 ? `${step.distance}m` : "Here"}
              </div>
              ${stepsWalked ? `<span class="step-walk-count">${stepsWalked}</span>` : ""}
            </div>
          </div>
        `;
      })
      .join("");

    // Clear Arrival Confirmation Banner (PART A.4 Requirements)
    const arrivalHtml = `
      <div class="arrival-confirmation-card">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${this.activeRoute.arrivalMessage || `✓ Destination reached: ${this.activeRoute.destinationCode}`}</span>
      </div>
    `;

    this.turnCardsList.innerHTML = headerHtml + cardsHtml + arrivalHtml;

    // Attach click listeners to cards
    this.turnCardsList.querySelectorAll(".turn-card").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.getAttribute("data-step-index"), 10);
        this.setActiveStep(idx, true);
      });
    });

    this.updateStepProgressUI();
  }

  setActiveStep(index, shouldSpeak = false) {
    if (!this.activeRoute || index < 0 || index >= this.activeRoute.steps.length) return;

    this.activeStepIndex = index;
    const cards = this.turnCardsList.querySelectorAll(".turn-card");
    cards.forEach((c, idx) => {
      if (idx === index) {
        c.classList.add("active-step");
        c.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        c.classList.remove("active-step");
      }
    });

    this.updateStepProgressUI();

    // Synchronize map highlight
    if (this.floorMap) {
      this.floorMap.highlightStep(index);
    }

    if (shouldSpeak) {
      voiceGuidance.speakStep(this.activeRoute.steps[index], index);
    }
  }

  goToStep(index) {
    this.setActiveStep(index, true);
  }

  updateStepProgressUI() {
    if (!this.activeRoute) return;

    const totalSteps = this.activeRoute.steps.length;
    const currentStep = this.activeStepIndex + 1;
    this.stepCounterText.textContent = `Step ${currentStep} of ${totalSteps}`;

    const progressPct = (currentStep / totalSteps) * 100;
    this.stepProgressFill.style.width = `${progressPct}%`;

    const activeStepData = this.activeRoute.steps[this.activeStepIndex];
    if (activeStepData && activeStepData.wing) {
      this.activeWingIndicator.textContent = activeStepData.wing === "CENTRAL" ? "Central Spine" : `Wing ${activeStepData.wing}`;
    }

    this.btnPrevStep.disabled = this.activeStepIndex === 0;
    this.btnNextStep.disabled = this.activeStepIndex === totalSteps - 1;
  }

  setViewMode(mode) {
    this.currentViewMode = mode;

    if (this.viewModeMap) this.viewModeMap.classList.toggle("active", mode === "map");
    if (this.viewModeDirectory) this.viewModeDirectory.classList.toggle("active", mode === "directory");

    if (this.interactiveMapArea) this.interactiveMapArea.classList.toggle("hidden", mode !== "map");
    if (this.directoryContentArea) this.directoryContentArea.classList.toggle("hidden", mode !== "directory");

    // Directory filter bar is primarily for directory view
    if (this.directoryFilterBar) {
      this.directoryFilterBar.classList.toggle("hidden", mode !== "directory");
    }

    if (mode === "map" && this.floorMap) {
      this.floorMap.renderFloorGeometry(this.floorMap.currentFloor);
      if (this.activeRoute) {
        this.floorMap.renderRouteHighlight();
      }
    }
  }

  renderFloorExplorer() {
    const floorMeta = FLOOR_INFO[this.selectedFloor];
    if (floorMeta) {
      this.floorSummaryBanner.innerHTML = `
        <strong>${floorMeta.name} (${floorMeta.prefix}):</strong> ${floorMeta.highlights}
      `;
    }

    // Filter directory items for this floor
    const rooms = CAMPUS_DIRECTORY.filter((room) => {
      if (room.floor !== this.selectedFloor) return false;
      if (this.selectedWingFilter !== "ALL" && room.wing !== this.selectedWingFilter) {
        return false;
      }
      if (this.directorySearchQuery) {
        const q = this.directorySearchQuery;
        const codeMatch = room.code.toLowerCase().includes(q);
        const nameMatch = room.name.toLowerCase().includes(q);
        const deptMatch = room.department.toLowerCase().includes(q);
        const kwMatch = room.keywords && room.keywords.some((k) => k.toLowerCase().includes(q));
        if (!codeMatch && !nameMatch && !deptMatch && !kwMatch) return false;
      }
      return true;
    });

    if (rooms.length === 0) {
      this.directoryRoomGrid.innerHTML = `
        <div class="dropdown-empty" style="grid-column: 1 / -1; padding: 2rem;">
          No facilities found on ${floorMeta ? floorMeta.name : this.selectedFloor} matching filter criteria.
        </div>
      `;
      return;
    }

    const cardsHtml = rooms
      .map((room) => {
        const wingText = room.wing === "CENTRAL" ? "Central Spine" : `Wing ${room.wing}`;
        return `
          <div class="room-card" data-room-id="${room.id}">
            <div class="room-card-header">
              <span class="room-code-badge">${room.code}</span>
              <span class="room-wing-tag">${wingText}</span>
            </div>
            <div>
              <h3 class="room-name-title">${room.name}</h3>
              <p class="room-dept-desc">${room.department} • ${room.description}</p>
            </div>
            <div class="room-card-footer">
              <span class="room-type-chip">${room.category}</span>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn-set-as-start" data-room-id="${room.id}" title="Set as Start Location">
                  Set Start
                </button>
                <button class="btn-navigate-to" data-room-id="${room.id}" title="Navigate to this room">
                  Directions
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    this.directoryRoomGrid.innerHTML = cardsHtml;

    // Attach click listeners to room cards
    this.directoryRoomGrid.querySelectorAll(".btn-navigate-to").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const roomId = btn.getAttribute("data-room-id");
        this.setDestinationById(roomId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    this.directoryRoomGrid.querySelectorAll(".btn-set-as-start").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const roomId = btn.getAttribute("data-room-id");
        this.setOriginById(roomId);
        this.showToast(`Start location updated to ${roomId}`);
      });
    });
  }

  copyRouteLink() {
    if (!this.activeRoute) {
      this.showToast("Please calculate a route first.");
      return;
    }

    const originName = this.activeRoute.startPointName;
    const destName = `${this.activeRoute.destinationName} (${this.activeRoute.destinationCode})`;
    const summary = `KKWIEER Smart Campus Guide: ${originName} -> ${destName} (${this.activeRoute.totalDistance}m, ${this.activeRoute.totalDurationMinutes} min)\n` +
      this.activeRoute.steps.map((s) => `${s.stepNumber}. [${s.symbol}] ${s.instruction}`).join("\n");

    navigator.clipboard
      .writeText(summary)
      .then(() => {
        this.showToast("Route summary copied to clipboard!");
      })
      .catch(() => {
        this.showToast("Route ready.");
      });
  }

  openGuideModal() {
    this.guideModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeGuideModal() {
    this.guideModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openValidationModal() {
    if (this.validationModal) {
      this.validationModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  closeValidationModal() {
    if (this.validationModal) {
      this.validationModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  showToast(msg) {
    this.toastMessage.textContent = msg;
    this.toast.classList.remove("hidden");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.classList.add("hidden");
    }, 3200);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.campusNavigator = new CampusNavigatorApp();
});
