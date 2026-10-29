/**
 * KKWIEER Main Building - Indoor Graph Topology
 * Models the multi-floor corridor network, central administrative spine,
 * central foyer crossway, 4 wings (A, B, D, E), library hub, and staircase cores.
 */

import { CAMPUS_DIRECTORY } from "./campus-directory.js";

// Helper to create node
export const NODES = {};
export const ADJACENCY = {};

function addNode(id, data) {
  NODES[id] = { id, ...data };
  if (!ADJACENCY[id]) ADJACENCY[id] = [];
}

function addEdge(fromId, toId, distance, direction, description = "", reverseDescription = "") {
  if (!ADJACENCY[fromId]) ADJACENCY[fromId] = [];
  if (!ADJACENCY[toId]) ADJACENCY[toId] = [];

  ADJACENCY[fromId].push({
    target: toId,
    distance,
    direction,
    description: description || "Continue along the corridor"
  });

  // Calculate reverse direction
  let reverseDir = "straight";
  if (direction === "turn-right") reverseDir = "turn-left";
  else if (direction === "turn-left") reverseDir = "turn-right";
  else if (direction === "stairs-up") reverseDir = "stairs-down";
  else if (direction === "stairs-down") reverseDir = "stairs-up";

  // Generate clean, natural reverse description if not explicitly provided
  let revDesc = reverseDescription;
  if (!revDesc) {
    if (description.includes("Access Wing")) {
      revDesc = "Step out of the staircase onto the corridor";
    } else if (description.includes("Arrive at")) {
      revDesc = "Exit into the main corridor";
    } else if (description.includes("Turn right towards") || description.includes("Turn left towards") || description.includes("Turn half-")) {
      revDesc = "Follow corridor to the Central Foyer / Crossway";
    } else if (direction === "stairs-up") {
      revDesc = description.replace("up to", "down to").replace("Climb", "Walk down");
    } else {
      revDesc = "Walk straight along the corridor";
    }
  }

  ADJACENCY[toId].push({
    target: fromId,
    distance,
    direction: reverseDir,
    description: revDesc
  });
}

// --------------------------------------------------------------------------
// 1. GROUND FLOOR (LEVEL G) - Central Administrative Spine & Foyer
// --------------------------------------------------------------------------
addNode("MAIN-ENT", {
  label: "Main Entrance",
  floor: "G",
  wing: "CENTRAL",
  type: "entrance",
  landmark: "Main Entrance (Ground Floor lobby)"
});

addNode("spine_g_1", {
  label: "Main Hallway (near Accounts)",
  floor: "G",
  wing: "CENTRAL",
  type: "corridor",
  landmark: "Main hallway past Accounts and Cashier"
});

addNode("spine_g_2", {
  label: "Main Hallway (near Principal's Office)",
  floor: "G",
  wing: "CENTRAL",
  type: "corridor",
  landmark: "Main hallway outside Principal's Office"
});

addNode("spine_g_3", {
  label: "Main Hallway (near Central Seminar Hall)",
  floor: "G",
  wing: "CENTRAL",
  type: "corridor",
  landmark: "Main hallway before Central Seminar Hall"
});

addNode("foyer_crossway_G", {
  label: "Central Foyer",
  floor: "G",
  wing: "CENTRAL",
  type: "foyer",
  landmark: "Central circular foyer (connects all 4 wings and library)"
});

// Admin spine connections
addEdge("MAIN-ENT", "spine_g_1", 12, "straight", "Walk straight ahead down the main hallway");
addEdge("spine_g_1", "spine_g_2", 14, "straight", "Continue straight ahead past Accounts Office on your left");
addEdge("spine_g_2", "spine_g_3", 14, "straight", "Walk straight ahead past Principal's Office on your right");
addEdge("spine_g_3", "foyer_crossway_G", 12, "straight", "Walk straight into the central circular foyer");

// Connect Ground Spine Facilities
addNode("ACC-01", { label: "Accounts Office", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("spine_g_1", "ACC-01", 3, "turn-left", "Turn left into Accounts Office");

addNode("CASH-01", { label: "Cashier Cabin", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("spine_g_1", "CASH-01", 3, "turn-left", "Turn left into Cashier Cabin");

addNode("PRIN-01", { label: "Principal's Office", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("spine_g_2", "PRIN-01", 3, "turn-right", "Turn right into the Principal's Office");

addNode("STAFF-01", { label: "Administrative Staff Office & Board Room", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("spine_g_2", "STAFF-01", 3, "turn-left", "Turn left into Admin Staff Office and Board Room");

addNode("C-SEM-01", { label: "Central Seminar Hall", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("spine_g_3", "C-SEM-01", 4, "turn-right", "Turn right into Central Seminar Hall");

// --------------------------------------------------------------------------
// 2. CENTRAL LIBRARY & T&P HUB (Ground Floor - East Center)
// --------------------------------------------------------------------------
addNode("lib_hub_corridor_G", {
  label: "Library Entrance",
  floor: "G",
  wing: "CENTRAL",
  type: "foyer",
  landmark: "Central Library and T&P entrance"
});

addEdge("foyer_crossway_G", "lib_hub_corridor_G", 15, "straight", "At the central circular foyer, go straight ahead towards the Library");

addNode("LIB-01", { label: "Central Library Reading Hall", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("lib_hub_corridor_G", "LIB-01", 4, "turn-right", "Turn right into Central Library Reading Hall");

addNode("LIB-02", { label: "Book Stack & Circulation Section", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("lib_hub_corridor_G", "LIB-02", 5, "straight", "Walk straight to Book Stack and Issue Counter");

addNode("LIB-03", { label: "Digital Library", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("lib_hub_corridor_G", "LIB-03", 6, "turn-left", "Turn left into Digital Library");

addNode("TP-01", { label: "Training & Placement (T&P) Office", floor: "G", wing: "CENTRAL", type: "room" });
addEdge("lib_hub_corridor_G", "TP-01", 6, "turn-left", "Turn left into Training & Placement Office");

// --------------------------------------------------------------------------
// 3. WINGS DEFINITION HELPER FOR MULTI-FLOOR ARCHITECTURE
// --------------------------------------------------------------------------
const WINGS_CONFIG = {
  A: {
    name: "Wing A",
    turnFromFoyer: "turn-left",
    foyerDirectionText: "Turn left into Wing A"
  },
  B: {
    name: "Wing B",
    turnFromFoyer: "turn-right",
    foyerDirectionText: "Turn right into Wing B"
  },
  D: {
    name: "Wing D",
    turnFromFoyer: "turn-right",
    foyerDirectionText: "Turn right into Wing D"
  },
  E: {
    name: "Wing E",
    turnFromFoyer: "turn-left",
    foyerDirectionText: "Turn left into Wing E"
  }
};

const FLOORS = ["G", "1", "2", "3", "4"];

// Build Wing Nodes and Staircases for all Floors
FLOORS.forEach((floor) => {
  // Central Crossway / Bridge on upper floors
  if (floor !== "G") {
    addNode(`crossway_${floor}`, {
      label: `Level ${floor} Central Bridge Crossway`,
      floor,
      wing: "CENTRAL",
      type: "foyer",
      landmark: `Central Crossway Bridge on Level ${floor}`
    });
  }

  // Generate nodes for each wing on this floor
  Object.keys(WINGS_CONFIG).forEach((wing) => {
    const innerStairId = `stair_${wing}_inner_${floor}`;
    const outerStairId = `stair_${wing}_outer_${floor}`;
    const corridorEntranceId = `wing_${wing}_entrance_${floor}`;
    const corridorMidId = `wing_${wing}_mid_${floor}`;
    const corridorFarId = `wing_${wing}_far_${floor}`;

    // Inner Wing Staircase landing
    addNode(innerStairId, {
      label: `Wing ${wing} Inner Staircase (Level ${floor})`,
      floor,
      wing,
      type: "staircase",
      landmark: `Wing ${wing} Inner Staircase landing right off the Central Foyer`
    });

    // Outer Wing Staircase landing
    addNode(outerStairId, {
      label: `Wing ${wing} Outer Staircase (Level ${floor})`,
      floor,
      wing,
      type: "staircase",
      landmark: `Wing ${wing} Outer Staircase at the far corner of the wing perimeter`
    });

    // Wing Corridors
    addNode(corridorEntranceId, {
      label: `Wing ${wing} Entrance Corridor (Level ${floor})`,
      floor,
      wing,
      type: "corridor",
      landmark: `Wing ${wing} corridor entrance`
    });

    addNode(corridorMidId, {
      label: `Wing ${wing} Central Corridor (Level ${floor})`,
      floor,
      wing,
      type: "corridor",
      landmark: `Midway down Wing ${wing} corridor`
    });

    addNode(corridorFarId, {
      label: `Wing ${wing} End Corridor (Level ${floor})`,
      floor,
      wing,
      type: "corridor",
      landmark: `Far end of Wing ${wing} corridor`
    });

    // Horizontal connections inside wing
    addEdge(corridorEntranceId, innerStairId, 3, "straight", `Go to Wing ${wing} stairs`);
    addEdge(corridorEntranceId, corridorMidId, 16, "straight", `Walk down the Wing ${wing} hallway`);
    addEdge(corridorMidId, corridorFarId, 18, "straight", `Continue straight down the Wing ${wing} hallway`);
    addEdge(corridorFarId, outerStairId, 4, "straight", `Go to Wing ${wing} end stairs`);

    // Connect Wing to Central Foyer / Crossway
    if (floor === "G") {
      const cfg = WINGS_CONFIG[wing];
      addEdge("foyer_crossway_G", corridorEntranceId, 10, cfg.turnFromFoyer, cfg.foyerDirectionText);
    } else {
      const crosswayId = `crossway_${floor}`;
      const cfg = WINGS_CONFIG[wing];
      addEdge(crosswayId, corridorEntranceId, 10, cfg.turnFromFoyer, cfg.foyerDirectionText);
    }
  });

  // Level 2 Applied Sciences central hub connection
  if (floor === "2") {
    addNode("applied_sci_corridor_2", {
      label: "Applied Sciences Corridor (Level 2)",
      floor: "2",
      wing: "CENTRAL",
      type: "corridor",
      landmark: "Central corridor between Wings A & B on Level 2"
    });
    addEdge("crossway_2", "applied_sci_corridor_2", 8, "straight", "Walk into Applied Sciences corridor");

    // Connect Applied Sciences rooms
    ["F304", "F305", "F306", "F307"].forEach((id) => {
      addNode(id, { label: id, floor: "2", wing: "CENTRAL", type: "room" });
      addEdge("applied_sci_corridor_2", id, 3, "turn-right", `Turn into ${id}`);
    });
  }

  // Level 1 Annex corridor (F201, F203, F204-I, F204-II, F205, F206, F207, F208)
  if (floor === "1") {
    addNode("annex_corridor_1", {
      label: "Level 1 Central Annex Corridor",
      floor: "1",
      wing: "CENTRAL",
      type: "corridor",
      landmark: "Annex corridor linking East & West wings"
    });
    addEdge("crossway_1", "annex_corridor_1", 8, "straight", "Walk into Level 1 Annex corridor");

    ["F201", "F203", "F204-I", "F204-II"].forEach((id) => {
      addNode(id, { label: id, floor: "1", wing: "A", type: "room" });
      addEdge("annex_corridor_1", id, 4, "turn-left", `Turn into ${id}`);
    });

    ["F205", "F206", "F207", "F208"].forEach((id) => {
      addNode(id, { label: id, floor: "1", wing: "E", type: "room" });
      addEdge("annex_corridor_1", id, 4, "turn-right", `Turn into ${id}`);
    });
  }

  // Level 3 Annex corridor (F401-I, F401-II, F402, F403)
  if (floor === "3") {
    addNode("annex_corridor_3", {
      label: "Level 3 Annex Corridor",
      floor: "3",
      wing: "A",
      type: "corridor",
      landmark: "Level 3 Annex research corridor"
    });
    addEdge("wing_A_mid_3", "annex_corridor_3", 6, "turn-right", "Turn into Wing A Annex corridor");

    ["F401-I", "F401-II", "F402", "F403"].forEach((id) => {
      addNode(id, { label: id, floor: "3", wing: "A", type: "room" });
      addEdge("annex_corridor_3", id, 3, "turn-left", `Turn into ${id}`);
    });
  }
});

// --------------------------------------------------------------------------
// 4. VERTICAL STAIRCASE CONNECTIONS (Floor Transitions)
// --------------------------------------------------------------------------
// Each floor transition costs ~14 meters (two flights of stairs, ~25 seconds walk effort)
const FLOOR_ORDER = ["G", "1", "2", "3", "4"];

for (let i = 0; i < FLOOR_ORDER.length - 1; i++) {
  const fCurrent = FLOOR_ORDER[i];
  const fNext = FLOOR_ORDER[i + 1];

  Object.keys(WINGS_CONFIG).forEach((wing) => {
    // Inner Staircase vertical edge
    const innerCurrent = `stair_${wing}_inner_${fCurrent}`;
    const innerNext = `stair_${wing}_inner_${fNext}`;
    addEdge(
      innerCurrent,
      innerNext,
      14,
      "stairs-up",
      `Climb Wing ${wing} Inner Staircase up to Level ${fNext}`
    );

    // Outer Staircase vertical edge
    const outerCurrent = `stair_${wing}_outer_${fCurrent}`;
    const outerNext = `stair_${wing}_outer_${fNext}`;
    addEdge(
      outerCurrent,
      outerNext,
      14,
      "stairs-up",
      `Climb Wing ${wing} Outer Staircase up to Level ${fNext}`
    );
  });
}

// --------------------------------------------------------------------------
// 5. ATTACH ALL ROOMS FROM CAMPUS DIRECTORY TO WING CORRIDORS
// --------------------------------------------------------------------------
CAMPUS_DIRECTORY.forEach((room) => {
  // If already attached (e.g. admin spine or applied sciences), skip
  if (NODES[room.id]) {
    // Ensure room metadata updated
    Object.assign(NODES[room.id], room);
    return;
  }

  // Create room node
  addNode(room.id, {
    ...room,
    type: "room"
  });

  const wing = room.wing;
  const floor = room.floor;

  // Determine closest corridor waypoint inside the wing
  // Heuristic: rooms numbered 01-04 are entrance/mid; 05-11 are mid/far
  let targetCorridor = `wing_${wing}_mid_${floor}`;
  const code = room.code;

  if (code.includes("01") || code.includes("02") || code.includes("03") || code.includes("04")) {
    targetCorridor = `wing_${wing}_entrance_${floor}`;
  } else if (code.includes("05") || code.includes("06") || code.includes("07")) {
    targetCorridor = `wing_${wing}_mid_${floor}`;
  } else {
    targetCorridor = `wing_${wing}_far_${floor}`;
  }

  // Alternate left/right door side for natural instructions
  const isEven = parseInt(code.replace(/[^0-9]/g, ""), 10) % 2 === 0;
  const turnDirection = isEven ? "turn-right" : "turn-left";
  const sideWord = isEven ? "on your right" : "on your left";

  addEdge(
    targetCorridor,
    room.id,
    3,
    turnDirection,
    `Arrive at ${room.name} (${room.code}) ${sideWord}`
  );
});

console.log(`KKWIEER Building Graph Initialized: ${Object.keys(NODES).length} nodes ready.`);
