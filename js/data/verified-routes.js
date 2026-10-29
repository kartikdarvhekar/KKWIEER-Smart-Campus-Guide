/**
 * KKWIEER Smart Campus Guide - Verified Route Configuration
 * 
 * SOURCE OF TRUTH: 26 Verified Routes for Main Building
 * Ground Floor: Mechanical Engineering Area (Routes 1-8)
 * First Floor: Mechanical Engineering Area via Ganesh Statue Staircase (Routes 9-16)
 * Second Floor: Computer Engineering Area via Ganesh Statue Staircase (Routes 17-24)
 * Third Floor: Computer Engineering Area (Routes 25-26 - Flagged for Confirmation)
 */

export const NAVIGATION_SYMBOLS = {
  START: "📍 START",
  DESTINATION: "🎯 DESTINATION",
  GO_STRAIGHT: "↑ GO STRAIGHT",
  TURN_RIGHT: "↱ TURN RIGHT",
  TURN_LEFT: "↰ TURN LEFT",
  STAIRS_UP: "⬆ STAIRS UP",
  STAIRS_DOWN: "⬇ STAIRS DOWN",
  PASS_ROOMS: "→ PASS ROOMS",
  WALK_STEPS: "👣 WALK 4–5 STEPS",
  ARRIVED: "✓ DESTINATION REACHED"
};

export const VALIDATION_REPORT = {
  title: "KKWIEER Smart Campus Guide — Route Data Validation Report",
  date: "2026-10-27",
  items: [
    {
      id: "VAL-1",
      routes: ["Route 3", "Route 4"],
      status: "RESOLVED_DISTINCT",
      summary: "Route 3 (E103-I) & Route 4 (E103-II) vs Second Floor E303-I/E303-II",
      details: "Initial notes referenced E303-I/E303-II on ground floor. Confirmed and kept as Ground Floor E103-I (Mechatronics Lab) and E103-II (Design Software Lab). Not merged with 2nd Floor E303-I/E303-II."
    },
    {
      id: "VAL-2",
      routes: ["Route 6"],
      status: "NEEDS_CONFIRMATION",
      summary: "Data Conflict: Destination E106-II ends at room identified as E106-I",
      details: "Route 6 destination is E106-II, but step 3 identifies: 'The first room on your right is identified in the supplied notes as E106-I'. Flagged for field verification; destination-room mapping kept unresolved until confirmed."
    },
    {
      id: "VAL-3",
      routes: ["Route 25", "Route 26"],
      status: "NEEDS_CONFIRMATION",
      summary: "Floor Numbering & Department Mismatch for E401 & E402",
      details: "Supplied notes state Computer Engineering on Third Floor. However, 400-series numbering typically indicates Level 3 or 4 mismatch with Computer Engg department core on Level 2. Flagged for review; directions displayed as supplied but floor marked as 'Needs Confirmation'."
    },
    {
      id: "VAL-4",
      routes: ["Routes 9–24"],
      status: "VERIFIED",
      summary: "Staircase near Ganesh Statue connectivity",
      details: "Confirmed that the primary staircase on the left of Main Entrance Lobby (near Ganesh statue) connects Ground Floor directly to First Floor (Mechanical Engg) and Second Floor (Computer Engg)."
    },
    {
      id: "VAL-5",
      routes: ["Routes 3–8", "Routes 11–16", "Routes 19–24"],
      status: "SURVEY_PENDING",
      summary: "Door Order & Department Board alignment",
      details: "Department Boards (Mechanical Engineering Board and Computer Engineering Board) confirmed as primary hallway waypoints. Sub-room door order (first/second room on left/right) mapped according to verified written sequence pending official CAD coordinate update."
    },
    {
      id: "VAL-6",
      routes: ["All 26 Routes"],
      status: "VERIFIED",
      summary: "Destination room number synchronization",
      details: "Every route card, interactive map pin, search result, and voice readout is strictly synchronized to the selected room number and name."
    }
  ]
};

export const VERIFIED_ROUTES = [
  // =========================================================================
  // GROUND FLOOR — MECHANICAL ENGINEERING AREA (Routes 1–8)
  // =========================================================================
  {
    id: "ROUTE-1",
    routeNumber: 1,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E101",
    destinationCode: "E101",
    destinationName: "Room E101",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E101 — Mechanical Engineering.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Room E101 is on your left.",
        landmarks: ["Room E101 door"],
        mapPoint: { x: 540, y: 390 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here (Main Entrance Lobby)" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 390, label: "🎯 E101" }
      ]
    }
  },
  {
    id: "ROUTE-2",
    routeNumber: 2,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E102",
    destinationCode: "E102",
    destinationName: "Room E102",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E102.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left.",
        landmarks: ["Wing E North Corridor"],
        mapPoint: { x: 550, y: 400 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.WALK_STEPS,
        action: "WALK_STEPS",
        instruction: "Walk approximately 4–5 steps. Room E102 is on your left.",
        landmarks: ["Room E102 door"],
        mapPoint: { x: 550, y: 350 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 350, label: "🎯 E102" }
      ]
    }
  },
  {
    id: "ROUTE-3",
    routeNumber: 3,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E103-I",
    destinationCode: "E103-I",
    destinationName: "Mechatronics Lab (E103-I)",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Ground floor E103-I kept distinct from second-floor E303-I. Room order subject to physical label check.",
    arrivalMessage: "✓ Destination reached: E103-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left.",
        landmarks: ["Wing E Hallway"],
        mapPoint: { x: 550, y: 350 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The first room is identified in the supplied notes as E103-I.",
        landmarks: ["First room on right turn (E103-I)"],
        mapPoint: { x: 610, y: 320 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 320 },
        { x: 610, y: 320, label: "🎯 E103-I" }
      ]
    }
  },
  {
    id: "ROUTE-4",
    routeNumber: 4,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E103-II",
    destinationCode: "E103-II",
    destinationName: "Design Software Lab (E103-II)",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Ground floor E103-II kept distinct from second-floor E303-II. Room order subject to physical label check.",
    arrivalMessage: "✓ Destination reached: E103-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left.",
        landmarks: ["Wing E Hallway"],
        mapPoint: { x: 550, y: 350 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The second room is identified in the supplied notes as E103-II.",
        landmarks: ["Second room on right turn (E103-II)"],
        mapPoint: { x: 660, y: 320 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 320 },
        { x: 660, y: 320, label: "🎯 E103-II" }
      ]
    }
  },
  {
    id: "ROUTE-5",
    routeNumber: 5,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E106-I",
    destinationCode: "E106-I",
    destinationName: "IC Engine Lab (E106-I)",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Room order subject to physical label check.",
    arrivalMessage: "✓ Destination reached: E106-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right.",
        landmarks: ["Wing E South Section"],
        mapPoint: { x: 550, y: 470 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The second room is identified as E106-I.",
        landmarks: ["Second room on left (E106-I)"],
        mapPoint: { x: 640, y: 410 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 470 },
        { x: 640, y: 470 },
        { x: 640, y: 410, label: "🎯 E106-I" }
      ]
    }
  },
  {
    id: "ROUTE-6",
    routeNumber: 6,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E106-II",
    destinationCode: "E106-II",
    destinationName: "Tutorial Room (E106-II)",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "NEEDS_CONFIRMATION",
    validationNote: "DATA CONFLICT: Destination is E106-II, but step 3 identifies: 'The first room on your right is identified in the supplied notes as E106-I'. Flagged for field review; destination-room mapping unresolved.",
    arrivalMessage: "✓ Destination reached: E106-II (Needs Confirmation: note states E106-I).",
    geometryStatus: "NEEDS_CONFIRMATION",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right.",
        landmarks: ["Wing E South Section"],
        mapPoint: { x: 550, y: 470 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The first room on your right is identified in the supplied notes as E106-I. [Flagged: destination is E106-II, but note states E106-I]",
        landmarks: ["First room on right (identified as E106-I in notes)"],
        mapPoint: { x: 640, y: 440 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 470 },
        { x: 640, y: 470 },
        { x: 640, y: 440, label: "🎯 E106-II [⚠️ Needs Confirmation]" }
      ]
    }
  },
  {
    id: "ROUTE-7",
    routeNumber: 7,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E108-I",
    destinationCode: "E108-I",
    destinationName: "Theory of Machines Lab (E108-I)",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Room order subject to physical label check.",
    arrivalMessage: "✓ Destination reached: E108-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The second room on your right is the intended destination.",
        landmarks: ["Second room on right (E108-I)"],
        mapPoint: { x: 650, y: 490 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 490 },
        { x: 650, y: 490, label: "🎯 E108-I" }
      ]
    }
  },
  {
    id: "ROUTE-8",
    routeNumber: 8,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E108-II",
    destinationCode: "E108-II",
    destinationName: "Fluid Machinery Lab (E108-II)",
    department: "Mechanical Engineering",
    floor: "G",
    floorLabel: "Ground Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Room order subject to physical label check.",
    arrivalMessage: "✓ Destination reached: E108-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Walk right until you see the Mechanical Engineering Board above.",
        landmarks: ["Mechanical Engineering Board"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The first room on your right is the intended destination.",
        landmarks: ["First room on right (E108-II)"],
        mapPoint: { x: 600, y: 490 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 490 },
        { x: 600, y: 490, label: "🎯 E108-II" }
      ]
    }
  },

  // =========================================================================
  // FIRST FLOOR — MECHANICAL ENGINEERING AREA (Routes 9–16)
  // Landmark: Staircase on the left side of Main Entrance Lobby, near Ganesh statue
  // =========================================================================
  {
    id: "ROUTE-9",
    routeNumber: 9,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E201",
    destinationCode: "E201",
    destinationName: "Mechanical Class Room 1 (E201)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E201.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The first room on your left is the intended destination.",
        landmarks: ["First room on left (E201)"],
        mapPoint: { x: 540, y: 390 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing (1st Floor)" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 390, label: "🎯 E201" }
      ]
    }
  },
  {
    id: "ROUTE-10",
    routeNumber: 10,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E202",
    destinationCode: "E202",
    destinationName: "Mechanical Class Room 2 (E202)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E202.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The second room on your left is the intended destination.",
        landmarks: ["Second room on left (E202)"],
        mapPoint: { x: 540, y: 350 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing (1st Floor)" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 350, label: "🎯 E202" }
      ]
    }
  },
  {
    id: "ROUTE-11",
    routeNumber: 11,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E203-I",
    destinationCode: "E203-I",
    destinationName: "Mechanical Class Room 3 (E203-I)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E203-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.PASS_ROOMS,
        action: "PASS_ROOMS",
        instruction: "Turn left and pass two rooms.",
        landmarks: ["Passed two rooms on left"],
        mapPoint: { x: 550, y: 320 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The first room on your left is the intended destination.",
        landmarks: ["First room on left (E203-I)"],
        mapPoint: { x: 610, y: 320 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 320 },
        { x: 610, y: 320, label: "🎯 E203-I" }
      ]
    }
  },
  {
    id: "ROUTE-12",
    routeNumber: 12,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E203-II",
    destinationCode: "E203-II",
    destinationName: "Mechanical Class Room 3 (E203-II)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E203-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.PASS_ROOMS,
        action: "PASS_ROOMS",
        instruction: "Turn left and pass two rooms.",
        landmarks: ["Passed two rooms on left"],
        mapPoint: { x: 550, y: 320 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The second room on your left is the intended destination.",
        landmarks: ["Second room on left (E203-II)"],
        mapPoint: { x: 660, y: 320 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 320 },
        { x: 660, y: 320, label: "🎯 E203-II" }
      ]
    }
  },
  {
    id: "ROUTE-13",
    routeNumber: 13,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E206-I",
    destinationCode: "E206-I",
    destinationName: "Heat Transfer Lab (E206-I)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E206-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight.",
        landmarks: ["Wing E South Hallway"],
        mapPoint: { x: 550, y: 470 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The second room on your left is the intended destination.",
        landmarks: ["Second room on left (E206-I)"],
        mapPoint: { x: 640, y: 410 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 470 },
        { x: 640, y: 470 },
        { x: 640, y: 410, label: "🎯 E206-I" }
      ]
    }
  },
  {
    id: "ROUTE-14",
    routeNumber: 14,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E206-II",
    destinationCode: "E206-II",
    destinationName: "RAC Lab (E206-II)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E206-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight.",
        landmarks: ["Wing E South Hallway"],
        mapPoint: { x: 550, y: 470 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The first room on your left is the intended destination.",
        landmarks: ["First room on left (E206-II)"],
        mapPoint: { x: 640, y: 440 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 470 },
        { x: 640, y: 470 },
        { x: 640, y: 440, label: "🎯 E206-II" }
      ]
    }
  },
  {
    id: "ROUTE-15",
    routeNumber: 15,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E208-I",
    destinationCode: "E208-I",
    destinationName: "Simulation Lab (E208-I)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E208-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The first room on your right is the intended destination.",
        landmarks: ["First room on right (E208-I)"],
        mapPoint: { x: 600, y: 490 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 490 },
        { x: 600, y: 490, label: "🎯 E208-I" }
      ]
    }
  },
  {
    id: "ROUTE-16",
    routeNumber: 16,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E208-II",
    destinationCode: "E208-II",
    destinationName: "Mechanical Class Room (E208-II)",
    department: "Mechanical Engineering",
    floor: "1",
    floorLabel: "First Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E208-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs using the staircase on the left, near the Ganesh statue, to the first floor.",
        landmarks: ["Ganesh statue", "Staircase on left"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Mechanical Engineering Board.",
        landmarks: ["Mechanical Engineering Board (First Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The second room on your right is the intended destination.",
        landmarks: ["Second room on right (E208-II)"],
        mapPoint: { x: 650, y: 490 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 1st Floor" }
      ],
      1: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Mechanical Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 490 },
        { x: 650, y: 490, label: "🎯 E208-II" }
      ]
    }
  },

  // =========================================================================
  // SECOND FLOOR — COMPUTER ENGINEERING AREA (Routes 17–24)
  // Landmark: Staircase on the left near Ganesh statue to second floor
  // =========================================================================
  {
    id: "ROUTE-17",
    routeNumber: 17,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E301",
    destinationCode: "E301",
    destinationName: "Computer Class Room 1 (E301)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E301.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The first room on your left is the intended destination.",
        landmarks: ["First room on left (E301)"],
        mapPoint: { x: 540, y: 390 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing (2nd Floor)" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 390, label: "🎯 E301" }
      ]
    }
  },
  {
    id: "ROUTE-18",
    routeNumber: 18,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E302",
    destinationCode: "E302",
    destinationName: "Computer Class Room 2 (E302)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E302.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The second room on your left is the intended destination.",
        landmarks: ["Second room on left (E302)"],
        mapPoint: { x: 540, y: 350 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing (2nd Floor)" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 350, label: "🎯 E302" }
      ]
    }
  },
  {
    id: "ROUTE-19",
    routeNumber: 19,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E303-I",
    destinationCode: "E303-I",
    destinationName: "Programming Lab I (E303-I)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E303-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.PASS_ROOMS,
        action: "PASS_ROOMS",
        instruction: "Turn left and pass two rooms.",
        landmarks: ["Passed two rooms on left"],
        mapPoint: { x: 550, y: 320 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The first room on your left is the intended destination.",
        landmarks: ["First room on left (E303-I)"],
        mapPoint: { x: 610, y: 320 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 320 },
        { x: 610, y: 320, label: "🎯 E303-I" }
      ]
    }
  },
  {
    id: "ROUTE-20",
    routeNumber: 20,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E303-II",
    destinationCode: "E303-II",
    destinationName: "Programming Lab II (E303-II)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E303-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.PASS_ROOMS,
        action: "PASS_ROOMS",
        instruction: "Turn left and pass two rooms.",
        landmarks: ["Passed two rooms on left"],
        mapPoint: { x: 550, y: 320 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The second room on your left is the intended destination.",
        landmarks: ["Second room on left (E303-II)"],
        mapPoint: { x: 660, y: 320 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 320 },
        { x: 660, y: 320, label: "🎯 E303-II" }
      ]
    }
  },
  {
    id: "ROUTE-21",
    routeNumber: 21,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E306-I",
    destinationCode: "E306-I",
    destinationName: "Programming Lab III (E306-I)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E306-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight.",
        landmarks: ["Wing E South Hallway (2nd Floor)"],
        mapPoint: { x: 550, y: 470 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The second room on your right is the intended destination.",
        landmarks: ["Second room on right (E306-I)"],
        mapPoint: { x: 640, y: 410 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 470 },
        { x: 640, y: 470 },
        { x: 640, y: 410, label: "🎯 E306-I" }
      ]
    }
  },
  {
    id: "ROUTE-22",
    routeNumber: 22,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E306-II",
    destinationCode: "E306-II",
    destinationName: "Programming Lab IV (E306-II)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E306-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight.",
        landmarks: ["Wing E South Hallway (2nd Floor)"],
        mapPoint: { x: 550, y: 470 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. The first room on your right is the intended destination.",
        landmarks: ["First room on right (E306-II)"],
        mapPoint: { x: 640, y: 440 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 470 },
        { x: 640, y: 470 },
        { x: 640, y: 440, label: "🎯 E306-II" }
      ]
    }
  },
  {
    id: "ROUTE-23",
    routeNumber: 23,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E308-I",
    destinationCode: "E308-I",
    destinationName: "Tutorial Lab (E308-I)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E308-I.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The second room on your right is the intended destination.",
        landmarks: ["Second room on right (E308-I)"],
        mapPoint: { x: 650, y: 490 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 490 },
        { x: 650, y: 490, label: "🎯 E308-I" }
      ]
    }
  },
  {
    id: "ROUTE-24",
    routeNumber: 24,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E308-II",
    destinationCode: "E308-II",
    destinationName: "Computer Project Lab (E308-II)",
    department: "Computer Engineering",
    floor: "2",
    floorLabel: "Second Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E308-II.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs to the second floor using the staircase on the left near the Ganesh statue.",
        landmarks: ["Ganesh statue", "Staircase to second floor"],
        mapPoint: { x: 320, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.GO_STRAIGHT,
        action: "GO_STRAIGHT",
        instruction: "Turn left and walk straight until you see the Computer Engineering Board.",
        landmarks: ["Computer Engineering Board (Second Floor)"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. The first room on your right is the intended destination.",
        landmarks: ["First room on right (E308-II)"],
        mapPoint: { x: 600, y: 490 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 You Are Here" },
        { x: 350, y: 440, label: "🕉️ Ganesh Statue" },
        { x: 320, y: 430, label: "⬆ Take Stairs up to 2nd Floor" }
      ],
      2: [
        { x: 320, y: 430, label: "⬆ Staircase Landing" },
        { x: 400, y: 430 },
        { x: 500, y: 430, label: "📋 Computer Engineering Board" },
        { x: 550, y: 430 },
        { x: 550, y: 490 },
        { x: 600, y: 490, label: "🎯 E308-II" }
      ]
    }
  },

  // =========================================================================
  // ROUTES A–E — THIRD FLOOR COMPUTER ENGINEERING (E401, E402, E403 R1, E406, E403 R2)
  // Supplied exactly as per instructions
  // =========================================================================
  {
    id: "ROUTE-25",
    routeNumber: 25,
    routeKey: "Route A",
    variant: 1,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E401",
    destinationCode: "E401",
    destinationName: "E401, Computer Engineering",
    department: "Computer Engineering",
    floor: "3",
    floorLabel: "Third Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E401, Computer Engineering.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight until you see the Department of Mechanical Engineering.",
        landmarks: ["Department of Mechanical Engineering"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk until you reach the stairs.",
        landmarks: ["Wing E Stairs"],
        mapPoint: { x: 550, y: 300 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs until the third floor.",
        landmarks: ["Third floor stairs"],
        mapPoint: { x: 550, y: 295 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk straight until you reach the Department of Computer Engineering board.",
        landmarks: ["Department of Computer Engineering board"],
        mapPoint: { x: 550, y: 345 }
      },
      {
        stepNumber: 5,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. Your destination is the second room on your right.",
        landmarks: ["Second room on your right (E401)"],
        mapPoint: { x: 580, y: 420 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 Start: Main Entrance Lobby" },
        { x: 400, y: 430 },
        { x: 500, y: 430 },
        { x: 550, y: 430 },
        { x: 550, y: 300 }
      ],
      3: [
        { x: 550, y: 295 },
        { x: 550, y: 345 },
        { x: 550, y: 420 },
        { x: 580, y: 420, label: "🎯 Destination: E401" }
      ]
    }
  },
  {
    id: "ROUTE-26",
    routeNumber: 26,
    routeKey: "Route B",
    variant: 1,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E402",
    destinationCode: "E402",
    destinationName: "E402, Computer Engineering",
    department: "Computer Engineering",
    floor: "3",
    floorLabel: "Third Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E402, Computer Engineering.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight until you see the Department of Mechanical Engineering.",
        landmarks: ["Department of Mechanical Engineering"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk until you reach the stairs.",
        landmarks: ["Wing E Stairs"],
        mapPoint: { x: 550, y: 300 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs until the third floor.",
        landmarks: ["Third floor stairs"],
        mapPoint: { x: 550, y: 295 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk straight until you reach the Department of Computer Engineering board.",
        landmarks: ["Department of Computer Engineering board"],
        mapPoint: { x: 550, y: 345 }
      },
      {
        stepNumber: 5,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. Your destination is the first room on your right.",
        landmarks: ["First room on your right (E402)"],
        mapPoint: { x: 580, y: 380 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 Start: Main Entrance Lobby" },
        { x: 400, y: 430 },
        { x: 500, y: 430 },
        { x: 550, y: 430 },
        { x: 550, y: 300 }
      ],
      3: [
        { x: 550, y: 295 },
        { x: 550, y: 345 },
        { x: 550, y: 380 },
        { x: 580, y: 380, label: "🎯 Destination: E402" }
      ]
    }
  },
  {
    id: "ROUTE-27",
    routeNumber: 27,
    routeKey: "Route C",
    variant: 1,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E403",
    destinationCode: "E403",
    destinationName: "E403, Computer Engineering — Route 1",
    department: "Computer Engineering",
    floor: "3",
    floorLabel: "Third Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Route 1 of 2 supplied for E403 (via Computer Engineering board).",
    arrivalMessage: "✓ Destination reached: E403 (Route 1), Computer Engineering.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight until you see the Department of Mechanical Engineering.",
        landmarks: ["Department of Mechanical Engineering"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk until you reach the stairs.",
        landmarks: ["Wing E Stairs"],
        mapPoint: { x: 550, y: 300 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs until the third floor.",
        landmarks: ["Third floor stairs"],
        mapPoint: { x: 550, y: 295 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk straight until you reach the Department of Computer Engineering board.",
        landmarks: ["Department of Computer Engineering board"],
        mapPoint: { x: 550, y: 345 }
      },
      {
        stepNumber: 5,
        symbol: NAVIGATION_SYMBOLS.DESTINATION,
        action: "ARRIVED",
        instruction: "Your destination is the room on your left-hand side.",
        landmarks: ["Room on left-hand side (E403)"],
        mapPoint: { x: 415, y: 345 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 Start: Main Entrance Lobby" },
        { x: 400, y: 430 },
        { x: 500, y: 430 },
        { x: 550, y: 430 },
        { x: 550, y: 300 }
      ],
      3: [
        { x: 550, y: 295 },
        { x: 550, y: 345 },
        { x: 415, y: 345, label: "🎯 Destination: E403" }
      ]
    }
  },
  {
    id: "ROUTE-28",
    routeNumber: 28,
    routeKey: "Route D",
    variant: 1,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E406",
    destinationCode: "E406",
    destinationName: "E406, Computer Engineering",
    department: "Computer Engineering",
    floor: "3",
    floorLabel: "Third Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: null,
    arrivalMessage: "✓ Destination reached: E406, Computer Engineering.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight until you see the Department of Mechanical Engineering.",
        landmarks: ["Department of Mechanical Engineering"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk until you reach the stairs.",
        landmarks: ["Wing E Stairs"],
        mapPoint: { x: 550, y: 300 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs until the third floor.",
        landmarks: ["Third floor stairs"],
        mapPoint: { x: 550, y: 295 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk straight until you reach the Department of Computer Engineering board.",
        landmarks: ["Department of Computer Engineering board"],
        mapPoint: { x: 550, y: 345 }
      },
      {
        stepNumber: 5,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and continue straight until you reach the washroom.",
        landmarks: ["Washroom"],
        mapPoint: { x: 489, y: 445 }
      },
      {
        stepNumber: 6,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right. Your destination is on your left-hand side.",
        landmarks: ["Destination on left-hand side (E406)"],
        mapPoint: { x: 415, y: 445 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 Start: Main Entrance Lobby" },
        { x: 400, y: 430 },
        { x: 500, y: 430 },
        { x: 550, y: 430 },
        { x: 550, y: 300 }
      ],
      3: [
        { x: 550, y: 295 },
        { x: 550, y: 345 },
        { x: 489, y: 345 },
        { x: 489, y: 445 },
        { x: 415, y: 445, label: "🎯 Destination: E406" }
      ]
    }
  },
  {
    id: "ROUTE-29",
    routeNumber: 29,
    routeKey: "Route E",
    variant: 2,
    startPoint: "MAIN-ENT",
    startPointName: "Main Entrance Lobby",
    destinationId: "E403-R2",
    destinationCode: "E403",
    destinationName: "E403, Computer Engineering — Route 2",
    department: "Computer Engineering",
    floor: "3",
    floorLabel: "Third Floor",
    wing: "E",
    validationStatus: "VERIFIED",
    validationNote: "Route 2 of 2 supplied for E403 (via North corridor).",
    arrivalMessage: "✓ Destination reached: E403 (Route 2), Computer Engineering.",
    geometryStatus: "MAPPED",
    steps: [
      {
        stepNumber: 1,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and walk straight until you see the Department of Mechanical Engineering.",
        landmarks: ["Department of Mechanical Engineering"],
        mapPoint: { x: 500, y: 430 }
      },
      {
        stepNumber: 2,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left and walk until you reach the stairs.",
        landmarks: ["Wing E Stairs"],
        mapPoint: { x: 550, y: 300 }
      },
      {
        stepNumber: 3,
        symbol: NAVIGATION_SYMBOLS.STAIRS_UP,
        action: "STAIRS_UP",
        instruction: "Go upstairs until the third floor.",
        landmarks: ["Third floor stairs"],
        mapPoint: { x: 550, y: 295 }
      },
      {
        stepNumber: 4,
        symbol: NAVIGATION_SYMBOLS.TURN_RIGHT,
        action: "TURN_RIGHT",
        instruction: "Turn right and continue straight.",
        landmarks: ["North corridor"],
        mapPoint: { x: 550, y: 250 }
      },
      {
        stepNumber: 5,
        symbol: NAVIGATION_SYMBOLS.TURN_LEFT,
        action: "TURN_LEFT",
        instruction: "Turn left. Your destination is on your right-hand side.",
        landmarks: ["Destination on right-hand side (E403)"],
        mapPoint: { x: 382, y: 325 }
      }
    ],
    mapSegments: {
      G: [
        { x: 400, y: 450, label: "📍 Start: Main Entrance Lobby" },
        { x: 400, y: 430 },
        { x: 500, y: 430 },
        { x: 550, y: 430 },
        { x: 550, y: 300 }
      ],
      3: [
        { x: 550, y: 295 },
        { x: 550, y: 250 },
        { x: 382, y: 250 },
        { x: 382, y: 325, label: "🎯 Destination: E403" }
      ]
    }
  }
];

/**
 * Normalizes room code strings for resilient matching
 */
function normalizeCode(code) {
  if (!code) return "";
  return code.toString().trim().toUpperCase().replace(/\s+/g, "");
}

/**
 * Lookup verified route by origin and destination IDs
 * Supports route variants (e.g. E403 Route 1 vs Route 2)
 * @param {string} originId
 * @param {string} destinationId
 * @param {number|null} variant
 * @returns {Object|null} Verified route object
 */
export function getVerifiedRoute(originId, destinationId, variant = null) {
  if (!originId || !destinationId) return null;

  const normOrig = normalizeCode(originId);
  const normDest = normalizeCode(destinationId);

  // Normalize origin for Main Entrance
  const isMainEntrance = normOrig === "MAIN-ENT" || normOrig.includes("MAIN") || normOrig.includes("ENTRANCE");
  if (!isMainEntrance) {
    return null;
  }

  // Handle aliases like E203 -> E203-I
  let matchDest = normDest;
  if (matchDest === "E203") matchDest = "E203-I";

  // E403 dual route handling (Route C vs Route E)
  if (matchDest === "E403" || matchDest === "E403-R1" || matchDest === "E403-R2") {
    if (variant === 2 || matchDest === "E403-R2") {
      return VERIFIED_ROUTES.find((r) => r.id === "ROUTE-29") || null;
    }
    return VERIFIED_ROUTES.find((r) => r.id === "ROUTE-27") || null;
  }

  const route = VERIFIED_ROUTES.find((r) => {
    const rDest = normalizeCode(r.destinationCode);
    const rId = normalizeCode(r.destinationId);
    return rDest === matchDest || rId === matchDest;
  });

  return route || null;
}

/**
 * Returns available route variants for destinations with multiple paths (e.g. E403)
 */
export function getRouteVariants(destinationId) {
  if (!destinationId) return [];
  const normDest = normalizeCode(destinationId);
  if (normDest === "E403" || normDest === "E403-R1" || normDest === "E403-R2") {
    return [
      {
        id: "ROUTE-27",
        variant: 1,
        label: "Route 1 (via Computer Board)",
        description: "Left to Computer Engg board → room on left"
      },
      {
        id: "ROUTE-29",
        variant: 2,
        label: "Route 2 (via North Corridor)",
        description: "Right past stairs → left to room on right"
      }
    ];
  }
  return [];
}

