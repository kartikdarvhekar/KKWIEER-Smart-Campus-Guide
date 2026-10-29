/**
 * Dijkstra Shortest-Path Algorithm & Student-Friendly Turn-By-Turn Navigation Engine
 * KKWIEER Main Building Indoor Navigator
 *
 * Designed specifically for new students:
 * - Simple, plain language (e.g. "Turn left", "Turn right", "Walk straight ahead")
 * - Consolidates confusing micro-corridor steps into clean, intuitive milestones
 * - Explains staircase climbs in 1 single clear step (e.g. "Go up the stairs to 2nd Floor")
 * - Landmark tips ("Pass Principal's Office on your right") so students never feel lost
 */

import { NODES, ADJACENCY } from "../data/building-graph.js";
import { VERIFIED_ROUTES, VALIDATION_REPORT, NAVIGATION_SYMBOLS, getVerifiedRoute, getRouteVariants } from "../data/verified-routes.js";

/**
 * Min-Priority Queue for Dijkstra
 */
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

/**
 * Run Dijkstra's Algorithm
 * @param {string} startNodeId
 * @param {string} endNodeId
 * @returns {Array<string>|null} List of node IDs representing the shortest path
 */
export function findShortestPath(startNodeId, endNodeId) {
  if (!NODES[startNodeId] || !NODES[endNodeId]) {
    console.error(`Invalid start (${startNodeId}) or destination (${endNodeId}) node ID`);
    return null;
  }

  if (startNodeId === endNodeId) {
    return [startNodeId];
  }

  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();

  for (const nodeId in NODES) {
    if (nodeId === startNodeId) {
      distances[nodeId] = 0;
      pq.enqueue(nodeId, 0);
    } else {
      distances[nodeId] = Infinity;
    }
    previous[nodeId] = null;
  }

  while (!pq.isEmpty()) {
    const current = pq.dequeue().val;

    if (current === endNodeId) {
      const path = [];
      let temp = endNodeId;
      while (temp) {
        path.unshift(temp);
        temp = previous[temp];
      }
      return path;
    }

    if (!current || distances[current] === Infinity) break;

    const neighbors = ADJACENCY[current] || [];
    for (const edge of neighbors) {
      const neighborId = edge.target;
      const candidateDist = distances[current] + edge.distance;

      if (candidateDist < distances[neighborId]) {
        distances[neighborId] = candidateDist;
        previous[neighborId] = current;
        pq.enqueue(neighborId, candidateDist);
      }
    }
  }

  return null;
}

/**
 * Friendly floor label for students
 */
function getFriendlyFloorLabel(floorCode) {
  switch (floorCode) {
    case "G": return "Ground Floor";
    case "1": return "1st Floor";
    case "2": return "2nd Floor";
    case "3": return "3rd Floor";
    case "4": return "4th Floor";
    default: return `Floor ${floorCode}`;
  }
}

/**
 * Friendly wing names with department clues
 */
function getFriendlyWingName(wingCode) {
  switch (wingCode) {
    case "A": return "Wing A (Electrical & E&TC)";
    case "B": return "Wing B (Chemical, IT, AI & DS, MBA)";
    case "D": return "Wing D (Civil, Robotics, MCA)";
    case "E": return "Wing E (Mechanical, Computer, CSD)";
    case "CENTRAL": return "Central Main Lobby";
    default: return `Wing ${wingCode}`;
  }
}

/**
 * Get edge info between two connected nodes
 */
function getEdgeInfo(fromId, toId) {
  const edges = ADJACENCY[fromId] || [];
  return edges.find((e) => e.target === toId) || {
    distance: 5,
    direction: "straight",
    description: "Walk straight ahead"
  };
}

/**
 * Converts a raw node path into refined turn-by-turn instruction cards.
 * Consolidates micro-segments into human-friendly, plain English milestones.
 */
export function generateTurnByTurnInstructions(pathNodeIds) {
  if (!pathNodeIds || pathNodeIds.length === 0) return null;

  const steps = [];
  let totalDistance = 0;
  const startNode = NODES[pathNodeIds[0]];
  const endNode = NODES[pathNodeIds[pathNodeIds.length - 1]];

  // 1. Origin Card
  steps.push({
    actionTag: "START HERE",
    type: "origin",
    icon: "📍",
    iconClass: "step-icon-origin",
    instruction: `Start at ${startNode.name || startNode.label}`,
    landmark: `Located on the ${getFriendlyFloorLabel(startNode.floor)}${startNode.wing && startNode.wing !== "CENTRAL" ? ` in Wing ${startNode.wing}` : ""}`,
    distance: 0,
    stepsEstimate: 0,
    floor: startNode.floor,
    wing: startNode.wing,
    isFloorChange: false
  });

  if (pathNodeIds.length === 1) {
    steps.push({
      actionTag: "YOU ARE HERE",
      type: "destination",
      icon: "🎯",
      iconClass: "step-icon-dest",
      instruction: `You are already at your destination!`,
      landmark: `${endNode.name || endNode.label} (${endNode.code || endNode.id})`,
      distance: 0,
      stepsEstimate: 0,
      floor: endNode.floor,
      wing: endNode.wing,
      isFloorChange: false
    });
    return {
      steps,
      totalDistance: 0,
      totalDurationMinutes: 0,
      floorDifference: 0,
      startFloor: startNode.floor,
      endFloor: endNode.floor
    };
  }

  // Iterate through pathNodeIds and compress consecutive corridor/stairway events
  let i = 0;

  // If origin is a room, add initial room exit step
  if (startNode.type === "room") {
    const nextNode = NODES[pathNodeIds[1]];
    const edge = getEdgeInfo(pathNodeIds[0], pathNodeIds[1]);
    totalDistance += edge.distance;
    steps.push({
      actionTag: "EXIT ROOM",
      type: "turn-straight",
      icon: "🚪",
      iconClass: "step-icon-straight",
      instruction: "Exit the room into the hallway",
      landmark: `Step into the ${nextNode.wing ? `Wing ${nextNode.wing}` : "main"} corridor`,
      distance: edge.distance,
      stepsEstimate: Math.max(2, Math.round(edge.distance * 1.3)),
      floor: startNode.floor,
      wing: startNode.wing,
      isFloorChange: false
    });
    i = 1;
  }

  while (i < pathNodeIds.length - 1) {
    const currId = pathNodeIds[i];
    const nextId = pathNodeIds[i + 1];
    const currNode = NODES[currId];
    const nextNode = NODES[nextId];
    const edge = getEdgeInfo(currId, nextId);

    // ----------------------------------------------------
    // CASE A: Destination Arrival (Final Step)
    // ----------------------------------------------------
    if (i + 1 === pathNodeIds.length - 1 && nextNode.type === "room") {
      totalDistance += edge.distance;
      const side = edge.direction === "turn-right" ? "on your right" : edge.direction === "turn-left" ? "on your left" : "ahead of you";
      steps.push({
        actionTag: "ARRIVED",
        type: "destination",
        icon: "🎯",
        iconClass: "step-icon-dest",
        instruction: `${endNode.code || endNode.id} is right here ${side}`,
        landmark: `${endNode.name} • ${endNode.department} (${getFriendlyFloorLabel(endNode.floor)})`,
        distance: edge.distance,
        stepsEstimate: Math.max(2, Math.round(edge.distance * 1.3)),
        floor: endNode.floor,
        wing: endNode.wing,
        isFloorChange: false
      });
      break;
    }

    // ----------------------------------------------------
    // CASE B: Staircase Transition (Consolidated)
    // ----------------------------------------------------
    if (edge.direction === "stairs-up" || edge.direction === "stairs-down" || nextId.startsWith("stair_")) {
      // Find where staircase climb begins and ends
      let stairStartFloor = currNode.floor;
      let stairEndFloor = currNode.floor;
      let stairWing = currNode.wing || "A";
      let isUp = true;
      let stairTotalDist = 0;
      let flightsCount = 0;

      // Consume approach to staircase if currently at entrance
      if (nextId.startsWith("stair_")) {
        stairTotalDist += edge.distance;
        i++;
      }

      // Now traverse actual staircase vertical steps
      while (i < pathNodeIds.length - 1) {
        const sCurrId = pathNodeIds[i];
        const sNextId = pathNodeIds[i + 1];
        const sEdge = getEdgeInfo(sCurrId, sNextId);

        if (sEdge.direction === "stairs-up" || sEdge.direction === "stairs-down") {
          isUp = sEdge.direction === "stairs-up";
          stairTotalDist += sEdge.distance;
          flightsCount++;
          stairStartFloor = NODES[sCurrId].floor;
          stairEndFloor = NODES[sNextId].floor;
          stairWing = NODES[sCurrId].wing || stairWing;
          i++;
        } else {
          // Lookahead: if stepping out onto corridor, consume it silently so student isn't burdened
          if (sCurrId.startsWith("stair_") && !sNextId.startsWith("stair_")) {
            stairTotalDist += sEdge.distance;
            i++;
          }
          break;
        }
      }

      totalDistance += stairTotalDist;
      const targetFloorName = getFriendlyFloorLabel(stairEndFloor);
      const actionWord = isUp ? "up" : "down";
      const actionBadge = isUp ? "GO UP STAIRS" : "GO DOWN STAIRS";

      steps.push({
        actionTag: actionBadge,
        type: "stairs",
        icon: "🪜",
        iconClass: "step-icon-stairs",
        instruction: `Go ${actionWord} the stairs to ${targetFloorName}`,
        landmark: `Take the Wing ${stairWing} stairs ${actionWord} ${flightsCount} floor${flightsCount > 1 ? "s" : ""} to reach ${targetFloorName}.`,
        distance: stairTotalDist,
        stepsEstimate: flightsCount * 22,
        floor: stairEndFloor,
        wing: stairWing,
        isFloorChange: true,
        flightsCount
      });

      continue;
    }

    // ----------------------------------------------------
    // CASE C: Central Circular Foyer Turn (Branching to Wings)
    // ----------------------------------------------------
    if (currId === "foyer_crossway_G" || currId.startsWith("crossway_")) {
      totalDistance += edge.distance;

      // Determine where this foyer connection leads
      if (nextId.startsWith("wing_A") || nextNode.wing === "A") {
        steps.push({
          actionTag: "TURN LEFT",
          type: "turn-left",
          icon: "⬅️",
          iconClass: "step-icon-turn-left",
          instruction: "Turn left into Wing A",
          landmark: "At the central circular foyer, take the left hallway for Electrical & E&TC.",
          distance: edge.distance,
          stepsEstimate: Math.round(edge.distance * 1.3),
          floor: currNode.floor,
          wing: "A",
          isFloorChange: false
        });
      } else if (nextId.startsWith("wing_B") || nextNode.wing === "B") {
        steps.push({
          actionTag: "TURN RIGHT",
          type: "turn-right",
          icon: "➡️",
          iconClass: "step-icon-turn-right",
          instruction: "Turn right into Wing B",
          landmark: "At the central circular foyer, take the right hallway for Chemical, IT, and AI & DS.",
          distance: edge.distance,
          stepsEstimate: Math.round(edge.distance * 1.3),
          floor: currNode.floor,
          wing: "B",
          isFloorChange: false
        });
      } else if (nextId.startsWith("wing_D") || nextNode.wing === "D") {
        steps.push({
          actionTag: "TURN RIGHT",
          type: "turn-right",
          icon: "➡️",
          iconClass: "step-icon-turn-right",
          instruction: "Turn right into Wing D",
          landmark: "At the central circular foyer, take the right hallway for Civil, Robotics, and MCA.",
          distance: edge.distance,
          stepsEstimate: Math.round(edge.distance * 1.3),
          floor: currNode.floor,
          wing: "D",
          isFloorChange: false
        });
      } else if (nextId.startsWith("wing_E") || nextNode.wing === "E") {
        steps.push({
          actionTag: "TURN LEFT",
          type: "turn-left",
          icon: "⬅️",
          iconClass: "step-icon-turn-left",
          instruction: "Turn left into Wing E",
          landmark: "At the central circular foyer, take the left hallway for Mechanical and Computer Engineering.",
          distance: edge.distance,
          stepsEstimate: Math.round(edge.distance * 1.3),
          floor: currNode.floor,
          wing: "E",
          isFloorChange: false
        });
      } else if (nextId.includes("lib_hub") || nextId.startsWith("LIB")) {
        steps.push({
          actionTag: "WALK STRAIGHT",
          type: "straight",
          icon: "⬆️",
          iconClass: "step-icon-straight",
          instruction: "Go straight ahead to the Library",
          landmark: "Walk straight across the central foyer into the Central Library and T&P section.",
          distance: edge.distance,
          stepsEstimate: Math.round(edge.distance * 1.3),
          floor: currNode.floor,
          wing: "CENTRAL",
          isFloorChange: false
        });
      } else {
        const turnAction = edge.direction === "turn-right" ? "TURN RIGHT" : edge.direction === "turn-left" ? "TURN LEFT" : "WALK STRAIGHT";
        const turnIcon = edge.direction === "turn-right" ? "➡️" : edge.direction === "turn-left" ? "⬅️" : "⬆️";
        const iconCls = edge.direction === "turn-right" ? "step-icon-turn-right" : edge.direction === "turn-left" ? "step-icon-turn-left" : "step-icon-straight";
        steps.push({
          actionTag: turnAction,
          type: edge.direction,
          icon: turnIcon,
          iconClass: iconCls,
          instruction: edge.direction === "straight" ? "Walk straight across the central foyer" : `Turn ${edge.direction === "turn-right" ? "right" : "left"} at the central foyer`,
          landmark: `Heading towards ${nextNode.label}`,
          distance: edge.distance,
          stepsEstimate: Math.round(edge.distance * 1.3),
          floor: currNode.floor,
          wing: currNode.wing,
          isFloorChange: false
        });
      }

      i++;
      continue;
    }

    // --------------------------------------------------------------------------
    // CASE D: Ground Floor Admin Spine (Consecutive Walk Consolidation)
    // --------------------------------------------------------------------------
    if (currId === "MAIN-ENT" || currId.startsWith("spine_g_")) {
      let spineDist = 0;

      while (i < pathNodeIds.length - 1) {
        const sCurr = pathNodeIds[i];
        const sNext = pathNodeIds[i + 1];

        // If next node is the final room, leave it for Case A arrival
        if (NODES[sNext] && NODES[sNext].type === "room") {
          break;
        }

        const sEdge = getEdgeInfo(sCurr, sNext);
        if (sCurr.startsWith("spine_g_") || sCurr === "MAIN-ENT") {
          spineDist += sEdge.distance;
          i++;
          if (sNext === "foyer_crossway_G" || !sNext.startsWith("spine_g_")) {
            break;
          }
        } else {
          break;
        }
      }

      if (spineDist > 0) {
        totalDistance += spineDist;
        steps.push({
          actionTag: "WALK STRAIGHT",
          type: "straight",
          icon: "⬆️",
          iconClass: "step-icon-straight",
          instruction: `Walk straight ahead down the main hallway (~${spineDist}m)`,
          landmark: "Walk straight past Accounts on your left and Principal's Office on your right to reach the central circular foyer.",
          distance: spineDist,
          stepsEstimate: Math.round(spineDist * 1.3),
          floor: "G",
          wing: "CENTRAL",
          isFloorChange: false
        });
      }

      continue;
    }

    // --------------------------------------------------------------------------
    // CASE E: Wing Hallway Walking
    // --------------------------------------------------------------------------
    // Consolidate straight walking inside a wing hallway
    let corridorDist = edge.distance;
    let wingName = currNode.wing || nextNode.wing || "wing";
    let nextStepIndex = i + 1;

    // Lookahead to see if next step is also straight along the same wing corridor
    while (nextStepIndex < pathNodeIds.length - 1) {
      const c1 = pathNodeIds[nextStepIndex];
      const c2 = pathNodeIds[nextStepIndex + 1];
      const cEdge = getEdgeInfo(c1, c2);
      const cNode2 = NODES[c2];

      // Stop if next node is a destination room
      if (cNode2 && cNode2.type === "room") {
        break;
      }

      if (cEdge.direction === "straight" && cNode2.type === "corridor" && cNode2.wing === wingName) {
        corridorDist += cEdge.distance;
        nextStepIndex++;
      } else {
        break;
      }
    }

    totalDistance += corridorDist;
    i = nextStepIndex;

    const actionTag = edge.direction === "turn-right" ? "TURN RIGHT" : edge.direction === "turn-left" ? "TURN LEFT" : "WALK STRAIGHT";
    const icon = edge.direction === "turn-right" ? "➡️" : edge.direction === "turn-left" ? "⬅️" : "⬆️";
    const iconCls = edge.direction === "turn-right" ? "step-icon-turn-right" : edge.direction === "turn-left" ? "step-icon-turn-left" : "step-icon-straight";

    let instruction = `Walk straight down the Wing ${wingName} hallway (~${corridorDist}m)`;
    if (edge.direction === "turn-right") instruction = `Turn right into the Wing ${wingName} hallway`;
    else if (edge.direction === "turn-left") instruction = `Turn left into the Wing ${wingName} hallway`;

    steps.push({
      actionTag,
      type: edge.direction,
      icon,
      iconClass: iconCls,
      instruction,
      landmark: `Follow the hallway on ${getFriendlyFloorLabel(currNode.floor)}.`,
      distance: corridorDist,
      stepsEstimate: Math.round(corridorDist * 1.3),
      floor: currNode.floor,
      wing: wingName,
      isFloorChange: false
    });
  }

  // Estimated walking time: ~1.2 m/s walk speed (72 m/min)
  // Plus 20 seconds penalty for each floor transition climbed
  const floorOrder = ["G", "1", "2", "3", "4"];
  const startIdx = floorOrder.indexOf(startNode.floor);
  const endIdx = floorOrder.indexOf(endNode.floor);
  const floorDifference = Math.abs(endIdx - startIdx);
  const floorPenaltySeconds = floorDifference * 20;

  const walkingSeconds = (totalDistance / 1.2) + floorPenaltySeconds;
  const totalDurationMinutes = Math.max(1, Math.round(walkingSeconds / 60));

  return {
    steps,
    totalDistance: Math.round(totalDistance),
    totalDurationMinutes,
    floorDifference,
    startFloor: startNode.floor,
    endFloor: endNode.floor,
    pathNodeIds
  };
}

/**
 * Main indoor route calculation engine.
 * STRICT SOURCE OF TRUTH: Uses the 26 verified routes from VERIFIED_ROUTES.
 * If a route is not verified, returns verifiedRouteAvailable: false without guessing.
 */
export function calculateRoute(originId, destinationId, variant = null) {
  if (!originId || !destinationId) return null;

  const verified = getVerifiedRoute(originId, destinationId, variant);
  if (!verified) {
    return {
      verifiedRouteAvailable: false,
      message: "Verified route not available",
      originId,
      destinationId
    };
  }

  // Format steps into UI-ready card objects
  const floorOrder = ["G", "1", "2", "3", "4"];
  const startIdx = floorOrder.indexOf("G");
  const endIdx = floorOrder.indexOf(verified.floor);
  const floorDifference = Math.max(0, endIdx - startIdx);

  // Compute estimated distance and walk time
  const stepCount = verified.steps.length;
  const estimatedMeters = Math.max(15, stepCount * 12 + floorDifference * 15);
  const estimatedMinutes = Math.max(1, Math.round((estimatedMeters / 60) + (floorDifference * 0.4)));

  const formattedSteps = verified.steps.map((st, idx) => {
    let iconClass = "step-icon-straight";
    let iconChar = "↑";
    let actionType = "straight";

    switch (st.action) {
      case "TURN_RIGHT":
        iconClass = "step-icon-turn-right";
        iconChar = "↱";
        actionType = "turn-right";
        break;
      case "TURN_LEFT":
        iconClass = "step-icon-turn-left";
        iconChar = "↰";
        actionType = "turn-left";
        break;
      case "STAIRS_UP":
        iconClass = "step-icon-stair";
        iconChar = "⬆";
        actionType = "stairs-up";
        break;
      case "STAIRS_DOWN":
        iconClass = "step-icon-stair";
        iconChar = "⬇";
        actionType = "stairs-down";
        break;
      case "PASS_ROOMS":
        iconClass = "step-icon-straight";
        iconChar = "→";
        actionType = "pass-rooms";
        break;
      case "WALK_STEPS":
        iconClass = "step-icon-straight";
        iconChar = "👣";
        actionType = "walk-steps";
        break;
      case "GO_STRAIGHT":
        iconClass = "step-icon-straight";
        iconChar = "↑";
        actionType = "straight";
        break;
      case "ARRIVED":
        iconClass = "step-icon-dest";
        iconChar = "🎯";
        actionType = "destination";
        break;
      default:
        iconClass = "step-icon-straight";
        iconChar = "•";
        actionType = "step";
    }

    let stepFloor = st.floor;
    if (!stepFloor) {
      if (verified.floor === "G") {
        stepFloor = "G";
      } else if (verified.floor === "1" || verified.floor === "2") {
        stepFloor = (idx === 0 || st.action === "STAIRS_UP") ? "G" : verified.floor;
      } else if (verified.floor === "3") {
        stepFloor = (idx < 2) ? "G" : "3";
      } else {
        stepFloor = verified.floor;
      }
    }

    return {
      stepNumber: st.stepNumber,
      symbol: st.symbol,
      action: st.action,
      actionTag: st.symbol,
      type: actionType,
      icon: iconChar,
      iconClass,
      instruction: st.instruction,
      landmarks: st.landmarks || [],
      landmark: (st.landmarks && st.landmarks.length > 0) ? st.landmarks.join(" • ") : null,
      mapPoint: st.mapPoint || null,
      floor: stepFloor,
      wing: verified.wing || "E",
      isFloorChange: st.action === "STAIRS_UP" || st.action === "STAIRS_DOWN",
      distance: 8 + (idx * 4),
      stepsEstimate: Math.max(4, Math.round((8 + idx * 4) * 1.3))
    };
  });

  return {
    verifiedRouteAvailable: true,
    id: verified.id,
    routeNumber: verified.routeNumber,
    routeKey: verified.routeKey || null,
    variant: verified.variant || 1,
    startPoint: verified.startPoint,
    startPointName: verified.startPointName,
    destinationId: verified.destinationId,
    destinationCode: verified.destinationCode,
    destinationName: verified.destinationName,
    department: verified.department,
    floor: verified.floor,
    floorLabel: verified.floorLabel,
    wing: verified.wing,
    validationStatus: verified.validationStatus,
    validationNote: verified.validationNote,
    arrivalMessage: verified.arrivalMessage,
    geometryStatus: verified.geometryStatus,
    mapSegments: verified.mapSegments,
    steps: formattedSteps,
    totalDistance: estimatedMeters,
    totalDurationMinutes: estimatedMinutes,
    floorDifference,
    startFloor: "G",
    endFloor: verified.floor,
    availableVariants: getRouteVariants(verified.destinationCode)
  };
}

export { VALIDATION_REPORT, NAVIGATION_SYMBOLS, VERIFIED_ROUTES, getVerifiedRoute, getRouteVariants };
