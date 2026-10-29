/**
 * KKWIEER Main Building - Verified Room Directory Dataset
 * Pre-embedded room, lab, cabin, library, and seminar hall directory.
 * Floor Levels: G, 1, 2, 3, 4
 * Wings: CENTRAL, A (NW), B (NE), D (SE), E (SW)
 */

export const FLOOR_INFO = {
  G: {
    name: "Ground Floor",
    levelNumber: 0,
    prefix: "100-series",
    highlights: "Central Administration, Principal's Office, Central Library & T&P Hub, Electrical (Wing A), Chemical (Wing B), Civil (Wing D), Mechanical (Wing E)."
  },
  1: {
    name: "First Floor",
    levelNumber: 1,
    prefix: "200-series",
    highlights: "Faraday Hall & Electrical Labs (Wing A), Chemical Engg & Drawing Hall (Wing B), M. Visvesvaraya Hall & Civil Labs (Wing D), Mechanical HOD & CAD Labs (Wing E)."
  },
  2: {
    name: "Second Floor",
    levelNumber: 2,
    prefix: "300-series",
    highlights: "E&TC Engg (Wing A), Information Technology (Wing B), Robotics & Automation (Wing D), Computer Engg HOD & Labs (Wing E), Applied Sciences & Physics/Chem Labs (Central)."
  },
  3: {
    name: "Third Floor",
    levelNumber: 3,
    prefix: "400-series",
    highlights: "E&TC Seminar Hall & Labs (Wing A), AI & Data Science (Wing B), Humanoid & Robotics Labs (Wing D), Advanced Computer Labs (Wing E)."
  },
  4: {
    name: "Fourth Floor",
    levelNumber: 4,
    prefix: "500-series",
    highlights: "PG Section & FE (Wing A), MBA Department & Seminar Hall (Wing B), MCA Department (Wing D), Computer Science & Design (CSD) & JVN Hall (Wing E)."
  }
};

export const CAMPUS_DIRECTORY = [
  // ==========================================
  // GROUND FLOOR (LEVEL G)
  // ==========================================
  // Central Administrative Spine & Library Hub
  {
    id: "MAIN-ENT",
    code: "MAIN-ENT",
    name: "Main Entrance Lobby",
    floor: "G",
    wing: "CENTRAL",
    department: "Administration",
    category: "ADMIN",
    description: "Primary building entrance lobby and porch. Starting point for all campus routes.",
    keywords: ["entrance", "porch", "start", "lobby", "you are here", "ground", "main gate", "reception", "main entrance lobby"]
  },
  {
    id: "ACC-01",
    code: "ACC-01",
    name: "Accounts Office",
    floor: "G",
    wing: "CENTRAL",
    department: "Administration",
    category: "ADMIN",
    description: "Central student fees, scholarship verification, and administrative accounts.",
    keywords: ["accounts", "fees", "scholarship", "finance", "admin", "bills"]
  },
  {
    id: "CASH-01",
    code: "CASH-01",
    name: "Cashier Cabin",
    floor: "G",
    wing: "CENTRAL",
    department: "Administration",
    category: "ADMIN",
    description: "Fee receipts counter and cashier desk inside the administrative wing.",
    keywords: ["cashier", "cash", "counter", "payment", "receipts"]
  },
  {
    id: "PRIN-01",
    code: "PRIN-01",
    name: "Principal's Office",
    floor: "G",
    wing: "CENTRAL",
    department: "Executive",
    category: "ADMIN",
    description: "Executive office of the Principal, KKWIEER. Flanked by visitors lobby.",
    keywords: ["principal", "director", "executive", "admin", "head of institute", "dr", "office"]
  },
  {
    id: "STAFF-01",
    code: "STAFF-01",
    name: "Administrative Staff Office & Board Room",
    floor: "G",
    wing: "CENTRAL",
    department: "Administration",
    category: "ADMIN",
    description: "Registrar, HR, administrative staff, and institute Governing Body Board Room.",
    keywords: ["board room", "staff", "admin", "registrar", "governing body", "meeting"]
  },
  {
    id: "C-SEM-01",
    code: "C-SEM-01",
    name: "Central Seminar Hall",
    floor: "G",
    wing: "CENTRAL",
    department: "Institute",
    category: "SEMINAR",
    description: "Main auditorium and central seminar hall on the ground floor for keynote sessions.",
    keywords: ["seminar hall", "central seminar", "auditorium", "hall", "keynote", "event"]
  },
  {
    id: "LIB-01",
    code: "LIB-01",
    name: "Central Library Reading Hall",
    floor: "G",
    wing: "CENTRAL",
    department: "Library & T&P",
    category: "LIBRARY",
    description: "Large reading hall in the hexagonal library hub with seating for 300+ students.",
    keywords: ["library", "reading hall", "books", "study", "central library", "hexagonal"]
  },
  {
    id: "LIB-02",
    code: "LIB-02",
    name: "Book Stack & Circulation Section",
    floor: "G",
    wing: "CENTRAL",
    department: "Library & T&P",
    category: "LIBRARY",
    description: "Book stacks, issue-return circulation desk, and reference textbooks.",
    keywords: ["book stack", "circulation", "issue", "return", "books", "reference"]
  },
  {
    id: "LIB-03",
    code: "LIB-03",
    name: "Digital Library",
    floor: "G",
    wing: "CENTRAL",
    department: "Library & T&P",
    category: "LIBRARY",
    description: "Digital learning resource center with computers for e-journal and IEEE access.",
    keywords: ["digital library", "ieee", "computers", "internet", "e-journals", "delnet"]
  },
  {
    id: "TP-01",
    code: "TP-01",
    name: "Training & Placement (T&P) Office",
    floor: "G",
    wing: "CENTRAL",
    department: "Training & Placement",
    category: "LIBRARY",
    description: "Central T&P Cell for corporate interviews, placement drives, and internships.",
    keywords: ["training and placement", "placement cell", "tp", "t&p", "interviews", "jobs", "internships"]
  },

  // Wing A (Ground - Electrical Engineering)
  {
    id: "A101",
    code: "A101",
    name: "SE Class Room",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "CLASSROOM",
    description: "Second Year Electrical Engineering classroom with smart projector.",
    keywords: ["a101", "classroom", "electrical", "se", "second year"]
  },
  {
    id: "A102",
    code: "A102",
    name: "FE Class Room",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "CLASSROOM",
    description: "First Year classroom in Wing A.",
    keywords: ["a102", "fe", "first year", "classroom", "electrical"]
  },
  {
    id: "A103-I",
    code: "A103-I",
    name: "Electrical Machine Lab I",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "AC and DC machines, motors, generators, and test benches.",
    keywords: ["a103-i", "a103", "electrical machine lab", "motors", "generators", "lab"]
  },
  {
    id: "A103-II",
    code: "A103-II",
    name: "Electrical Machine Lab II",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "Transformers, induction motor test rigs, and synchronous machines.",
    keywords: ["a103-ii", "machine lab 2", "transformers", "lab", "electrical"]
  },
  {
    id: "A104",
    code: "A104",
    name: "Panel Room",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "ADMIN",
    description: "Main electrical switchgear and distribution panel room.",
    keywords: ["a104", "panel room", "switchgear", "distribution", "power"]
  },
  {
    id: "A105",
    code: "A105",
    name: "Gents Lavatory",
    floor: "G",
    wing: "A",
    department: "Facilities",
    category: "WASHROOM",
    description: "Ground floor gents washroom in Wing A.",
    keywords: ["a105", "washroom", "toilet", "lavatory", "gents", "restroom"]
  },
  {
    id: "A106-I",
    code: "A106-I",
    name: "Material & High Voltage Lab",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "High voltage testing kits, insulation breakdown testing, and dielectric materials.",
    keywords: ["a106-i", "a106", "high voltage", "material lab", "insulation"]
  },
  {
    id: "A106-II",
    code: "A106-II",
    name: "ACCT Lab",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "Advanced circuits and control theory laboratory.",
    keywords: ["a106-ii", "acct lab", "circuits", "control theory"]
  },
  {
    id: "A107",
    code: "A107",
    name: "Electrical Staff Room",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "HOD",
    description: "Faculty cabins for Electrical Engineering professors.",
    keywords: ["a107", "staff room", "faculty", "electrical teachers", "cabins"]
  },
  {
    id: "A108-I",
    code: "A108-I",
    name: "Machine-II Lab",
    floor: "G",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "Specialized rotating electrical machinery lab.",
    keywords: ["a108-i", "a108", "machine lab", "electrical machinery"]
  },

  // Wing B (Ground - Chemical Engineering)
  {
    id: "B101",
    code: "B101",
    name: "TE Chemical Class Room",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "CLASSROOM",
    description: "Third Year Chemical Engineering classroom.",
    keywords: ["b101", "te chemical", "chemical classroom", "third year"]
  },
  {
    id: "B102",
    code: "B102",
    name: "BE Chemical Class Room",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "CLASSROOM",
    description: "Final Year Chemical Engineering classroom.",
    keywords: ["b102", "be chemical", "final year", "chemical classroom"]
  },
  {
    id: "B103-I",
    code: "B103-I",
    name: "PDC Lab (Process Dynamics & Control)",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Process dynamics, PID controllers, and SCADA process loops.",
    keywords: ["b103-i", "b103", "pdc lab", "process dynamics", "control", "chemical"]
  },
  {
    id: "B103-II",
    code: "B103-II",
    name: "MT-II Lab (Mass Transfer II)",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Distillation columns, extraction, absorption, and drying rigs.",
    keywords: ["b103-ii", "mt-ii lab", "mass transfer", "distillation", "chemical lab"]
  },
  {
    id: "B104",
    code: "B104",
    name: "Control Panel Room",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "ADMIN",
    description: "Chemical department pilot plant instrumentation panel.",
    keywords: ["b104", "control panel", "chemical", "instrumentation"]
  },
  {
    id: "B105",
    code: "B105",
    name: "Gents Lavatory",
    floor: "G",
    wing: "B",
    department: "Facilities",
    category: "WASHROOM",
    description: "Ground floor gents washroom in Wing B.",
    keywords: ["b105", "washroom", "toilet", "lavatory", "gents"]
  },
  {
    id: "B106-I",
    code: "B106-I",
    name: "MT-I Lab (Mass Transfer I)",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Diffusion, drying, and batch distillation equipment.",
    keywords: ["b106-i", "b106", "mt-i lab", "mass transfer 1", "chemical"]
  },
  {
    id: "B106-II",
    code: "B106-II",
    name: "CRE Lab (Chemical Reaction Engg)",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "CSTR, PFR, and batch kinetics experimental reactors.",
    keywords: ["b106-ii", "cre lab", "reaction engineering", "reactors", "kinetics"]
  },
  {
    id: "B107",
    code: "B107",
    name: "HOD Chemical Cabin",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "HOD",
    description: "Office of the Head of Department, Chemical Engineering.",
    keywords: ["b107", "hod chemical", "head of department", "chemical hod", "cabin"]
  },
  {
    id: "B108-I",
    code: "B108-I",
    name: "PMS Lab (Process Modeling & Simulation)",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Aspen Plus, ChemCAD, and MATLAB chemical simulation workstations.",
    keywords: ["b108-i", "b108", "pms lab", "simulation", "aspen", "chemical modeling"]
  },
  {
    id: "B108-II",
    code: "B108-II",
    name: "MO Lab (Mechanical Operations)",
    floor: "G",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Crushers, ball mills, cyclone separators, and filtration equipment.",
    keywords: ["b108-ii", "mo lab", "mechanical operations", "ball mill", "filtration"]
  },

  // Wing D (Ground - Civil Engineering)
  {
    id: "D101",
    code: "D101",
    name: "FE Civil Class Room",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "CLASSROOM",
    description: "First Year Civil Engineering classroom.",
    keywords: ["d101", "fe civil", "first year civil", "classroom"]
  },
  {
    id: "D102",
    code: "D102",
    name: "SE Civil Class Room",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "CLASSROOM",
    description: "Second Year Civil Engineering classroom.",
    keywords: ["d102", "se civil", "second year civil", "classroom"]
  },
  {
    id: "D103-I",
    code: "D103-I",
    name: "Geotechnical Engineering Lab",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Soil mechanics, direct shear, triaxial, and compaction testing.",
    keywords: ["d103-i", "d103", "geotechnical", "soil lab", "soil mechanics", "civil"]
  },
  {
    id: "D103-II",
    code: "D103-II",
    name: "Transportation Engineering Lab",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Bitumen testing, aggregate impact, Los Angeles abrasion, and pavement design.",
    keywords: ["d103-ii", "transportation lab", "highway", "bitumen", "aggregates", "civil"]
  },
  {
    id: "D104",
    code: "D104",
    name: "Civil Panel Room",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "ADMIN",
    description: "Power sub-panel and utility control room for Wing D.",
    keywords: ["d104", "panel room", "civil utility"]
  },
  {
    id: "D105",
    code: "D105",
    name: "Ladies Lavatory",
    floor: "G",
    wing: "D",
    department: "Facilities",
    category: "WASHROOM",
    description: "Ground floor ladies washroom in Wing D.",
    keywords: ["d105", "ladies toilet", "washroom", "restroom", "ladies lavatory"]
  },
  {
    id: "D106-I",
    code: "D106-I",
    name: "Mechanics Lab",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Engineering mechanics, friction apparatus, and beam deflection setups.",
    keywords: ["d106-i", "d106", "mechanics lab", "engineering mechanics", "forces"]
  },
  {
    id: "D106-II",
    code: "D106-II",
    name: "Fluid Mechanics Lab (Civil)",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Hydraulic benches, venturimeter, orifice meters, and pipe friction rigs.",
    keywords: ["d106-ii", "fluid mechanics", "hydraulics", "water flow", "civil"]
  },
  {
    id: "D107",
    code: "D107",
    name: "Associate Professor Cabin",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "HOD",
    description: "Senior faculty and Associate Professor office, Civil Engineering.",
    keywords: ["d107", "associate prof", "faculty cabin", "civil professor"]
  },
  {
    id: "D108-I",
    code: "D108-I",
    name: "Material Testing Lab (UTM)",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Universal Testing Machine (UTM), tensile and compression testing of steel and rebar.",
    keywords: ["d108-i", "d108", "material testing", "utm", "tensile test", "compression"]
  },
  {
    id: "D108-II",
    code: "D108-II",
    name: "Concrete Technology Lab",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Cement testing, concrete slump, cube compression, and non-destructive rebound hammer.",
    keywords: ["d108-ii", "concrete lab", "cement", "slump test", "concrete technology"]
  },
  {
    id: "D109-I",
    code: "D109-I",
    name: "Civil Faculty Room",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "HOD",
    description: "Civil Engineering teaching staff and consultation cabins.",
    keywords: ["d109-i", "d109", "civil faculty", "staff room", "teachers"]
  },
  {
    id: "D109-II",
    code: "D109-II",
    name: "Surveying Laboratory",
    floor: "G",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Total stations, theodolites, auto-levels, and GPS surveying equipment store.",
    keywords: ["d109-ii", "surveying lab", "total station", "theodolite", "leveling", "gps"]
  },

  // Wing E (Ground - Mechanical Engineering)
  {
    id: "E101",
    code: "E101",
    name: "FY B.Tech Class Room",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "First Year B.Tech core engineering classroom in Wing E.",
    keywords: ["e101", "fy btech", "first year btech", "mechanical classroom"]
  },
  {
    id: "E102",
    code: "E102",
    name: "Class Room II",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Mechanical Engineering lecture hall II.",
    keywords: ["e102", "class room ii", "mechanical classroom"]
  },
  {
    id: "E103-I",
    code: "E103-I",
    name: "Mechatronics Lab",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "Electro-pneumatic and hydraulic trainers, PLC automation, and sensor benches.",
    keywords: ["e103-i", "e103", "mechatronics lab", "pneumatics", "plc", "mechanical"]
  },
  {
    id: "E103-II",
    code: "E103-II",
    name: "Design Software Lab",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "SolidWorks, CATIA, and ANSYS mechanical modeling lab.",
    keywords: ["e103-ii", "design software", "cad", "solidworks", "ansys", "catia"]
  },
  {
    id: "E104",
    code: "E104",
    name: "Maintenance Office",
    floor: "G",
    wing: "E",
    department: "Facilities",
    category: "ADMIN",
    description: "Campus civil & electrical maintenance supervisor office.",
    keywords: ["e104", "maintenance", "repairs", "facilities", "estate"]
  },
  {
    id: "E105",
    code: "E105",
    name: "Gents Lavatory",
    floor: "G",
    wing: "E",
    department: "Facilities",
    category: "WASHROOM",
    description: "Ground floor gents washroom in Wing E.",
    keywords: ["e105", "washroom", "toilet", "lavatory", "gents"]
  },
  {
    id: "E106-I",
    code: "E106-I",
    name: "Internal Combustion Engine Lab",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "Single and multi-cylinder petrol and diesel engine test rigs with eddy current dynamometer.",
    keywords: ["e106-i", "e106", "ic engine lab", "diesel engine", "petrol engine", "dynamometer"]
  },
  {
    id: "E106-II",
    code: "E106-II",
    name: "Tutorial Room",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Discussion and tutorial solving classroom.",
    keywords: ["e106-ii", "tutorial room", "mechanical tutorial"]
  },
  {
    id: "E107",
    code: "E107",
    name: "Faculty Room (Mechanical)",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "HOD",
    description: "Faculty cabins for Mechanical department professors.",
    keywords: ["e107", "faculty room", "mechanical teachers", "staff"]
  },
  {
    id: "E108-I",
    code: "E108-I",
    name: "Theory of Machines Lab",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "Gyroscopes, governor apparatus, balancing rigs, and cam-follower mechanisms.",
    keywords: ["e108-i", "e108", "tom lab", "theory of machines", "gyroscope", "balancing"]
  },
  {
    id: "E108-II",
    code: "E108-II",
    name: "Fluid Machinery Lab (Mechanical)",
    floor: "G",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "Pelton wheel, Francis turbine, Kaplan turbine, and centrifugal pump test stands.",
    keywords: ["e108-ii", "fluid machinery", "turbines", "pelton wheel", "pumps"]
  },

  // ==========================================
  // LEVEL 1 (FIRST FLOOR)
  // ==========================================
  // Wing A (Level 1 - Electrical Engineering)
  {
    id: "A201",
    code: "A201",
    name: "TE Class Room",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "CLASSROOM",
    description: "Third Year Electrical Engineering classroom on First Floor.",
    keywords: ["a201", "te electrical", "third year", "classroom"]
  },
  {
    id: "A202",
    code: "A202",
    name: "BE Class Room",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "CLASSROOM",
    description: "Final Year Electrical Engineering classroom.",
    keywords: ["a202", "be electrical", "final year", "classroom"]
  },
  {
    id: "A203-I",
    code: "A203-I",
    name: "Project Lab (Electrical)",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "Hardware prototyping, IoT boards, and capstone project lab.",
    keywords: ["a203-i", "a203", "project lab", "electrical project"]
  },
  {
    id: "A204",
    code: "A204",
    name: "PG Staff Cabin",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "HOD",
    description: "Post Graduate M.Tech Electrical faculty cabins.",
    keywords: ["a204", "pg staff", "mtech faculty", "cabins"]
  },
  {
    id: "A205",
    code: "A205",
    name: "Lavatory",
    floor: "1",
    wing: "A",
    department: "Facilities",
    category: "WASHROOM",
    description: "First floor washroom in Wing A.",
    keywords: ["a205", "washroom", "toilet", "lavatory"]
  },
  {
    id: "A206-I",
    code: "A206-I",
    name: "Electrical Measurement Lab",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "Bridges, energy meter calibration, potentiometers, and digital power analyzers.",
    keywords: ["a206-i", "a206", "measurement lab", "bridges", "calibration"]
  },
  {
    id: "A206-II",
    code: "A206-II",
    name: "Control Systems Lab",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "Servomotors, synchros, PID tuning, and state feedback controllers.",
    keywords: ["a206-ii", "control lab", "control systems", "servomotors"]
  },
  {
    id: "A207",
    code: "A207",
    name: "HOD Electrical Cabin",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "HOD",
    description: "Office of the Head of Department, Electrical Engineering.",
    keywords: ["a207", "hod electrical", "head of department", "electrical hod", "cabin"]
  },
  {
    id: "A208-I",
    code: "A208-I",
    name: "Faraday Hall",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "SEMINAR",
    description: "Prestigious departmental audio-visual seminar hall of the Electrical Department.",
    keywords: ["a208-i", "a208", "faraday hall", "seminar hall", "electrical auditorium"]
  },
  {
    id: "A208-II",
    code: "A208-II",
    name: "Tutorial Room",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "CLASSROOM",
    description: "Department tutorial and group discussion room.",
    keywords: ["a208-ii", "tutorial", "electrical tutorial"]
  },
  {
    id: "F201",
    code: "F201",
    name: "Electrical Software Lab",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "LAB",
    description: "MATLAB, Simulink, PSCAD, and ETAP power simulation lab.",
    keywords: ["f201", "software lab", "matlab", "etap", "simulink"]
  },
  {
    id: "F203",
    code: "F203",
    name: "Tutorial Room (First Floor)",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "CLASSROOM",
    description: "First floor tutorial classroom in annex corridor.",
    keywords: ["f203", "tutorial room"]
  },
  {
    id: "F204-I",
    code: "F204-I",
    name: "PG Staff Room",
    floor: "1",
    wing: "A",
    department: "Electrical Engineering",
    category: "HOD",
    description: "Research guides and PG faculty offices.",
    keywords: ["f204-i", "f204", "pg staff", "research guide"]
  },
  {
    id: "F204-II",
    code: "F204-II",
    name: "Language Lab",
    floor: "1",
    wing: "A",
    department: "Applied Sciences",
    category: "LAB",
    description: "Digital English communication and language phonetics lab.",
    keywords: ["f204-ii", "language lab", "communication skills", "english lab"]
  },

  // Wing B (Level 1 - Chemical Engineering)
  {
    id: "B201",
    code: "B201",
    name: "FE Chemical Class Room",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "CLASSROOM",
    description: "First Year Chemical Engineering classroom.",
    keywords: ["b201", "fe chemical", "first year", "classroom"]
  },
  {
    id: "B202",
    code: "B202",
    name: "SE Chemical Class Room",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "CLASSROOM",
    description: "Second Year Chemical Engineering classroom.",
    keywords: ["b202", "se chemical", "second year", "classroom"]
  },
  {
    id: "B203-I",
    code: "B203-I",
    name: "Chemical Drawing Hall",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Process equipment drawing boards and plant layout drafting tables.",
    keywords: ["b203-i", "b203", "drawing hall", "plant design", "drafting"]
  },
  {
    id: "B203-II",
    code: "B203-II",
    name: "PIC Lab (Process Instrumentation)",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "Temperature, pressure, flow sensors, and calibration rigs.",
    keywords: ["b203-ii", "pic lab", "instrumentation", "sensors", "calibration"]
  },
  {
    id: "B204",
    code: "B204",
    name: "Department Store",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "ADMIN",
    description: "Glassware, chemical reagents, and department inventory store.",
    keywords: ["b204", "store", "chemical store", "glassware", "inventory"]
  },
  {
    id: "B205",
    code: "B205",
    name: "Lavatory",
    floor: "1",
    wing: "B",
    department: "Facilities",
    category: "WASHROOM",
    description: "First floor washroom in Wing B.",
    keywords: ["b205", "washroom", "toilet", "lavatory"]
  },
  {
    id: "B206-I",
    code: "B206-I",
    name: "Chemical Project Lab",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "LAB",
    description: "B.Tech capstone research and chemical project work area.",
    keywords: ["b206-i", "b206", "chemical project", "capstone"]
  },
  {
    id: "B206-II",
    code: "B206-II",
    name: "Tutorial Room",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "CLASSROOM",
    description: "Tutorial room for numerical problems in thermodynamics and kinetics.",
    keywords: ["b206-ii", "tutorial"]
  },
  {
    id: "B207",
    code: "B207",
    name: "Chemical Staff Room",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "HOD",
    description: "Faculty work cabins for Chemical Engineering staff.",
    keywords: ["b207", "staff room", "faculty", "chemical staff"]
  },
  {
    id: "B208-I",
    code: "B208-I",
    name: "Chemical Seminar Hall I",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "SEMINAR",
    description: "Air-conditioned seminar and guest lecture hall.",
    keywords: ["b208-i", "b208", "chemical seminar", "seminar hall", "guest lectures"]
  },
  {
    id: "B208-II",
    code: "B208-II",
    name: "Chemical Seminar Hall II",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "SEMINAR",
    description: "Department conference room and seminar hall II.",
    keywords: ["b208-ii", "seminar hall 2", "conference room"]
  },
  {
    id: "B209",
    code: "B209",
    name: "Senior Faculty Cabins",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "HOD",
    description: "Office cabins for senior professors.",
    keywords: ["b209", "senior faculty", "professors", "cabins"]
  },
  {
    id: "B210",
    code: "B210",
    name: "Department Library (Chemical)",
    floor: "1",
    wing: "B",
    department: "Chemical Engineering",
    category: "LIBRARY",
    description: "Specialized departmental library housing chemical engineering project theses and handbooks.",
    keywords: ["b210", "dept library", "chemical library", "handbooks", "theses"]
  },

  // Wing D (Level 1 - Civil Engineering)
  {
    id: "D201",
    code: "D201",
    name: "BE Civil Class Room",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "CLASSROOM",
    description: "Final Year Civil Engineering classroom.",
    keywords: ["d201", "be civil", "final year", "classroom"]
  },
  {
    id: "D202",
    code: "D202",
    name: "TE Civil Class Room",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "CLASSROOM",
    description: "Third Year Civil Engineering classroom.",
    keywords: ["d202", "te civil", "third year", "classroom"]
  },
  {
    id: "D203-I",
    code: "D203-I",
    name: "Civil Drawing Hall",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Building planning and structural drafting tables.",
    keywords: ["d203-i", "d203", "civil drawing hall", "drafting", "building planning"]
  },
  {
    id: "D203-II",
    code: "D203-II",
    name: "Civil Computer Lab",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "AutoCAD, STAAD.Pro, ETABS, and GIS workstations.",
    keywords: ["d203-ii", "civil computer lab", "autocad", "staad pro", "etabs"]
  },
  {
    id: "D204",
    code: "D204",
    name: "Department Store",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "ADMIN",
    description: "Equipment storage room for Civil department.",
    keywords: ["d204", "store", "civil store"]
  },
  {
    id: "D205",
    code: "D205",
    name: "Lavatory",
    floor: "1",
    wing: "D",
    department: "Facilities",
    category: "WASHROOM",
    description: "First floor washroom in Wing D.",
    keywords: ["d205", "washroom", "toilet", "lavatory"]
  },
  {
    id: "D206-I",
    code: "D206-I",
    name: "Sir M. Visvesvaraya Seminar Hall",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "SEMINAR",
    description: "Prestigious auditorium hall of Civil Engineering named after Sir M. Visvesvaraya.",
    keywords: ["d206-i", "d206", "visvesvaraya", "seminar hall", "civil auditorium", "hall"]
  },
  {
    id: "D206-II",
    code: "D206-II",
    name: "Civil Department Library",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "LIBRARY",
    description: "Indian Standard codes (IS 456, IS 800), IRC manuals, and project reports.",
    keywords: ["d206-ii", "dept library", "is codes", "civil library"]
  },
  {
    id: "D207",
    code: "D207",
    name: "HOD Civil Cabin",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "HOD",
    description: "Office of the Head of Department, Civil Engineering.",
    keywords: ["d207", "hod civil", "head of department", "civil hod", "cabin"]
  },
  {
    id: "D208-I",
    code: "D208-I",
    name: "Environmental Engineering Lab",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "BOD, COD incubators, spectrophotometers, jar test apparatus, and air sampling kits.",
    keywords: ["d208-i", "d208", "environmental lab", "bod", "cod", "water quality", "civil"]
  },
  {
    id: "D209-I",
    code: "D209-I",
    name: "Civil Faculty Room",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "HOD",
    description: "Cabins for Civil engineering professors.",
    keywords: ["d209-i", "d209", "faculty", "civil staff"]
  },
  {
    id: "D209-II",
    code: "D209-II",
    name: "Engineering Geology Lab",
    floor: "1",
    wing: "D",
    department: "Civil Engineering",
    category: "LAB",
    description: "Mineral specimens, rock core samples, crystal models, and structural geology maps.",
    keywords: ["d209-ii", "geology lab", "minerals", "rocks", "faults", "geology"]
  },

  // Wing E (Level 1 - Mechanical Engineering)
  {
    id: "E201",
    code: "E201",
    name: "Mechanical Class Room 1",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Core classroom for Mechanical department.",
    keywords: ["e201", "mechanical classroom"]
  },
  {
    id: "E202",
    code: "E202",
    name: "Mechanical Class Room 2",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Second Year lecture hall.",
    keywords: ["e202", "mechanical classroom 2"]
  },
  {
    id: "E203",
    code: "E203",
    name: "Mechanical Class Room 3",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Third Year lecture hall.",
    keywords: ["e203", "mechanical classroom 3"]
  },
  {
    id: "E203-I",
    code: "E203-I",
    name: "Room E203-I",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Mechanical Engineering classroom / lab section E203-I.",
    keywords: ["e203-i", "e203", "e203 1", "mechanical"]
  },
  {
    id: "E203-II",
    code: "E203-II",
    name: "Room E203-II",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Mechanical Engineering classroom / lab section E203-II.",
    keywords: ["e203-ii", "e203", "e203 2", "mechanical"]
  },
  {
    id: "E204",
    code: "E204",
    name: "Mechanical Department Office",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "ADMIN",
    description: "Administrative desk and student inquiry office for Mechanical Engineering.",
    keywords: ["e204", "dept office", "mechanical office", "admin"]
  },
  {
    id: "E205",
    code: "E205",
    name: "Lavatory",
    floor: "1",
    wing: "E",
    department: "Facilities",
    category: "WASHROOM",
    description: "First floor washroom in Wing E.",
    keywords: ["e205", "washroom", "toilet", "lavatory"]
  },
  {
    id: "E206-I",
    code: "E206-I",
    name: "Heat Transfer Lab",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "Conduction rods, forced/natural convection test rigs, Stefan-Boltzmann apparatus.",
    keywords: ["e206-i", "e206", "heat transfer", "convection", "conduction", "mechanical"]
  },
  {
    id: "E206-II",
    code: "E206-II",
    name: "RAC Lab (Refrigeration & Air Conditioning)",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "Vapor compression refrigeration test rig, air conditioning tutor, heat pump bench.",
    keywords: ["e206-ii", "rac lab", "refrigeration", "air conditioning", "hvac"]
  },
  {
    id: "E207",
    code: "E207",
    name: "HOD Mechanical Cabin",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "HOD",
    description: "Office of the Head of Department, Mechanical Engineering.",
    keywords: ["e207", "hod mechanical", "head of department", "mechanical hod", "cabin"]
  },
  {
    id: "E208-I",
    code: "E208-I",
    name: "Simulation Lab",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "CFD analysis and finite element analysis (FEA) computer lab.",
    keywords: ["e208-i", "e208", "simulation lab", "cfd", "fea", "fluent"]
  },
  {
    id: "E208-II",
    code: "E208-II",
    name: "Mechanical Class Room",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "CLASSROOM",
    description: "Lecture room for elective subjects.",
    keywords: ["e208-ii", "classroom"]
  },
  {
    id: "F205",
    code: "F205",
    name: "CAD Lab",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "LAB",
    description: "3D CAD modeling and computer-aided manufacturing drafting center.",
    keywords: ["f205", "cad lab", "mechanical cad", "3d design"]
  },
  {
    id: "F206",
    code: "F206",
    name: "Mechanical Staff Room",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "HOD",
    description: "Faculty room for thermal and design group professors.",
    keywords: ["f206", "staff room", "mechanical faculty"]
  },
  {
    id: "F207",
    code: "F207",
    name: "Senior Faculty Room",
    floor: "1",
    wing: "E",
    department: "Mechanical Engineering",
    category: "HOD",
    description: "Consultation and research faculty cabins.",
    keywords: ["f207", "senior faculty", "cabins"]
  },
  {
    id: "F208",
    code: "F208",
    name: "Ladies Common Room",
    floor: "1",
    wing: "E",
    department: "Facilities",
    category: "ADMIN",
    description: "Dedicated ladies rest and recreation room on first floor.",
    keywords: ["f208", "ladies room", "common room", "girls room"]
  },

  // ==========================================
  // LEVEL 2 (SECOND FLOOR)
  // ==========================================
  // Wing A (Level 2 - E&TC Engineering)
  {
    id: "A301",
    code: "A301",
    name: "BE E&TC Class Room",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "CLASSROOM",
    description: "Final Year Electronics & Telecommunication Engineering classroom.",
    keywords: ["a301", "be etc", "be entc", "telecommunication", "classroom"]
  },
  {
    id: "A302",
    code: "A302",
    name: "TE E&TC Class Room",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "CLASSROOM",
    description: "Third Year Electronics & Telecommunication classroom.",
    keywords: ["a302", "te etc", "te entc", "classroom"]
  },
  {
    id: "A303-I",
    code: "A303-I",
    name: "Embedded Systems Lab",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "ARM Cortex, STM32, Arduino, Raspberry Pi, and RTOS development lab.",
    keywords: ["a303-i", "a303", "embedded systems", "arm", "microcontroller", "etc"]
  },
  {
    id: "A303-II",
    code: "A303-II",
    name: "Instrumentation Lab (E&TC)",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Biomedical sensors, DAS systems, and precision measurement equipment.",
    keywords: ["a303-ii", "instrumentation lab", "sensors", "das", "etc"]
  },
  {
    id: "A304",
    code: "A304",
    name: "UPS Room",
    floor: "2",
    wing: "A",
    department: "Facilities",
    category: "ADMIN",
    description: "Uninterrupted power supply battery bank for E&TC labs.",
    keywords: ["a304", "ups", "power backup"]
  },
  {
    id: "A305",
    code: "A305",
    name: "Lavatory",
    floor: "2",
    wing: "A",
    department: "Facilities",
    category: "WASHROOM",
    description: "Second floor washroom in Wing A.",
    keywords: ["a305", "washroom", "toilet", "lavatory"]
  },
  {
    id: "A306-I",
    code: "A306-I",
    name: "E&TC Computer Lab",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "DSP signal processing, MATLAB, and circuit simulation workstations.",
    keywords: ["a306-i", "a306", "computer lab", "dsp", "matlab", "etc"]
  },
  {
    id: "A306-II",
    code: "A306-II",
    name: "Industrial Electronics Lab",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Power diodes, thyristors, IGBT inverters, and SMPS circuits.",
    keywords: ["a306-ii", "industrial electronics", "power electronics", "igbt", "thyristor"]
  },
  {
    id: "A307",
    code: "A307",
    name: "HOD E&TC Cabin",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "HOD",
    description: "Office of the Head of Department, Electronics & Telecommunication.",
    keywords: ["a307", "hod etc", "hod entc", "head of department", "cabin"]
  },
  {
    id: "A308-I",
    code: "A308-I",
    name: "VLSI Design Lab",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Cadence, Xilinx Vivado, FPGA trainer boards, and ASIC design.",
    keywords: ["a308-i", "a308", "vlsi", "fpga", "xilinx", "cadence", "verilog"]
  },
  {
    id: "A308-II",
    code: "A308-II",
    name: "Power Electronics Lab",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Chopper, inverter, and DC-DC converter experimental benches.",
    keywords: ["a308-ii", "power lab", "inverters", "converters"]
  },
  {
    id: "F301",
    code: "F301",
    name: "Medical Electronics Lab",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "ECG simulators, pulse oximeters, EEG amplifiers, and biomedical telemetry.",
    keywords: ["f301", "medical electronics", "biomedical", "ecg", "patient monitor"]
  },
  {
    id: "F302",
    code: "F302",
    name: "E&TC Faculty Room",
    floor: "2",
    wing: "A",
    department: "E&TC Engineering",
    category: "HOD",
    description: "Faculty cabins for E&TC professors.",
    keywords: ["f302", "faculty room", "etc teachers", "staff"]
  },

  // Wing B (Level 2 - Information Technology)
  {
    id: "B301",
    code: "B301",
    name: "FE IT Class Room",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "CLASSROOM",
    description: "First Year IT classroom.",
    keywords: ["b301", "fe it", "first year it", "classroom"]
  },
  {
    id: "B302",
    code: "B302",
    name: "SE IT Class Room",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "CLASSROOM",
    description: "Second Year IT classroom.",
    keywords: ["b302", "se it", "second year it", "classroom"]
  },
  {
    id: "B303-I",
    code: "B303-I",
    name: "IT Seminar Hall I",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "SEMINAR",
    description: "Information Technology seminar and guest lecture hall.",
    keywords: ["b303-i", "b303", "it seminar hall", "seminar hall", "tech talk"]
  },
  {
    id: "B303-II",
    code: "B303-II",
    name: "IT Seminar Hall II",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "SEMINAR",
    description: "IT Department presentation room and webinar center.",
    keywords: ["b303-ii", "it seminar hall 2", "webinar room"]
  },
  {
    id: "B304",
    code: "B304",
    name: "UPS Room",
    floor: "2",
    wing: "B",
    department: "Facilities",
    category: "ADMIN",
    description: "Central online UPS room supporting IT server racks and labs.",
    keywords: ["b304", "ups", "it ups"]
  },
  {
    id: "B305",
    code: "B305",
    name: "Lavatory",
    floor: "2",
    wing: "B",
    department: "Facilities",
    category: "WASHROOM",
    description: "Second floor washroom in Wing B.",
    keywords: ["b305", "washroom", "toilet", "lavatory"]
  },
  {
    id: "B306-I",
    code: "B306-I",
    name: "IT Software Lab I",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "LAB",
    description: "Full-stack development, Python, and data structures laboratory.",
    keywords: ["b306-i", "b306", "software lab 1", "programming", "python", "it"]
  },
  {
    id: "B306-II",
    code: "B306-II",
    name: "IT Software Lab II",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "LAB",
    description: "Web development, Java, database systems (DBMS), and SQL lab.",
    keywords: ["b306-ii", "software lab 2", "dbms", "sql", "java", "it"]
  },
  {
    id: "B307",
    code: "B307",
    name: "HOD IT Cabin",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "HOD",
    description: "Office of the Head of Department, Information Technology.",
    keywords: ["b307", "hod it", "head of department it", "information technology hod", "cabin"]
  },
  {
    id: "B308-I",
    code: "B308-I",
    name: "IT Project Lab I",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "LAB",
    description: "Final year B.Tech IT project incubator and coding workspace.",
    keywords: ["b308-i", "b308", "it project lab", "capstone", "hackathon"]
  },
  {
    id: "B308-II",
    code: "B308-II",
    name: "IT Project Lab II",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "LAB",
    description: "Cloud computing, AWS/Azure sandbox, and cybersecurity lab.",
    keywords: ["b308-ii", "cloud lab", "cybersecurity", "aws", "project lab"]
  },
  {
    id: "B309",
    code: "B309",
    name: "IT Department Office",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "ADMIN",
    description: "Student administration, exam forms, and records desk.",
    keywords: ["b309", "it dept office", "admin office", "clerk"]
  },
  {
    id: "B310",
    code: "B310",
    name: "Language Lab (IT Wing)",
    floor: "2",
    wing: "B",
    department: "Information Technology",
    category: "LAB",
    description: "Multimedia communication and corporate readiness lab.",
    keywords: ["b310", "language lab", "communication"]
  },

  // Wing D (Level 2 - Robotics & Automation / Civil)
  {
    id: "D301",
    code: "D301",
    name: "TE Civil Class Room A",
    floor: "2",
    wing: "D",
    department: "Civil Engineering",
    category: "CLASSROOM",
    description: "Third Year Civil Engineering Division A classroom.",
    keywords: ["d301", "te civil a", "civil classroom", "third year"]
  },
  {
    id: "D302",
    code: "D302",
    name: "TE Civil Class Room B",
    floor: "2",
    wing: "D",
    department: "Civil Engineering",
    category: "CLASSROOM",
    description: "Third Year Civil Engineering Division B classroom.",
    keywords: ["d302", "te civil b", "civil classroom"]
  },
  {
    id: "D303-I",
    code: "D303-I",
    name: "Automation Lab (Robotics)",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Industrial PLC panels, Siemens S7, servo motion controllers, and HMI.",
    keywords: ["d303-i", "d303", "automation lab", "plc", "siemens", "robotics"]
  },
  {
    id: "D303-II",
    code: "D303-II",
    name: "Embedded Systems Lab (R&A)",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Microcontroller interfacing, motor drives, CAN bus, and IoT robotic nodes.",
    keywords: ["d303-ii", "embedded lab", "motor drives", "robotics"]
  },
  {
    id: "D304",
    code: "D304",
    name: "Robotics Equipment Store",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "ADMIN",
    description: "Sensor store, motors, aluminum extrusions, and hardware inventory.",
    keywords: ["d304", "store", "robotics store"]
  },
  {
    id: "D305",
    code: "D305",
    name: "Lavatory",
    floor: "2",
    wing: "D",
    department: "Facilities",
    category: "WASHROOM",
    description: "Second floor washroom in Wing D.",
    keywords: ["d305", "washroom", "toilet", "lavatory"]
  },
  {
    id: "D306-I",
    code: "D306-I",
    name: "ROS & Autonomous Systems Lab",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Robot Operating System (ROS2), LiDAR navigation, SLAM, and mobile robot platforms.",
    keywords: ["d306-i", "d306", "ros lab", "robotics lab", "autonomous", "slam", "lidar"]
  },
  {
    id: "D306-II",
    code: "D306-II",
    name: "Robot Programming Lab",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Articulated 6-axis industrial robot arm teach pendant programming cells.",
    keywords: ["d306-ii", "robot programming", "robot arm", "kuka", "fanuc", "abb"]
  },
  {
    id: "D307",
    code: "D307",
    name: "HOD Robotics Cabin",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "HOD",
    description: "Office of the Head of Department, Robotics & Automation.",
    keywords: ["d307", "hod robotics", "head of department robotics", "cabin"]
  },
  {
    id: "D308-I",
    code: "D308-I",
    name: "Robot Simulation Lab",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Gazebo, Webots, CoppeliaSim, and digital twin simulation suite.",
    keywords: ["d308-i", "d308", "robot simulation", "gazebo", "digital twin"]
  },
  {
    id: "D308-II",
    code: "D308-II",
    name: "CIM Lab (Computer Integrated Mfg)",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Automated storage and retrieval (ASRS), AGV models, and flexible manufacturing.",
    keywords: ["d308-ii", "cim lab", "asrs", "agv", "manufacturing"]
  },
  {
    id: "D309-I",
    code: "D309-I",
    name: "Robotics Faculty Room I",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "HOD",
    description: "Faculty work stations and consultation desks.",
    keywords: ["d309-i", "d309", "robotics faculty", "teachers"]
  },
  {
    id: "D309-II",
    code: "D309-II",
    name: "Robotics Faculty Room II",
    floor: "2",
    wing: "D",
    department: "Robotics & Automation",
    category: "HOD",
    description: "Robotics professors and project guides cabins.",
    keywords: ["d309-ii", "faculty room 2"]
  },

  // Wing E (Level 2 - Computer Engineering)
  {
    id: "E301",
    code: "E301",
    name: "Computer Class Room 1",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "CLASSROOM",
    description: "Computer Engineering lecture hall with interactive display.",
    keywords: ["e301", "computer classroom 1", "comp classroom", "computer engg"]
  },
  {
    id: "E302",
    code: "E302",
    name: "Computer Class Room 2",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "CLASSROOM",
    description: "Computer Engineering lecture hall 2.",
    keywords: ["e302", "computer classroom 2"]
  },
  {
    id: "E303-I",
    code: "E303-I",
    name: "Programming Lab I (Computer)",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "C, C++, Data Structures, and algorithm design computer laboratory.",
    keywords: ["e303-i", "e303", "programming lab 1", "dsa", "c++", "computer"]
  },
  {
    id: "E303-II",
    code: "E303-II",
    name: "Programming Lab II (Computer)",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Object-oriented programming, Java, and software engineering lab.",
    keywords: ["e303-ii", "programming lab 2", "java", "oop", "computer"]
  },
  {
    id: "E304",
    code: "E304",
    name: "UPS Room (Computer Wing)",
    floor: "2",
    wing: "E",
    department: "Facilities",
    category: "ADMIN",
    description: "Heavy-duty 40kVA online UPS room for Computer Department servers.",
    keywords: ["e304", "ups", "computer ups"]
  },
  {
    id: "E305",
    code: "E305",
    name: "Lavatory",
    floor: "2",
    wing: "E",
    department: "Facilities",
    category: "WASHROOM",
    description: "Second floor washroom in Wing E.",
    keywords: ["e305", "washroom", "toilet", "lavatory"]
  },
  {
    id: "E306-I",
    code: "E306-I",
    name: "Programming Lab III (Computer)",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Database management systems (DBMS), MongoDB, Oracle, and MySQL lab.",
    keywords: ["e306-i", "e306", "programming lab 3", "dbms", "mysql", "mongodb"]
  },
  {
    id: "E306-II",
    code: "E306-II",
    name: "Programming Lab IV (Computer)",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Computer networks, Wireshark, socket programming, and Cisco packet tracer lab.",
    keywords: ["e306-ii", "programming lab 4", "networks", "wireshark", "cisco"]
  },
  {
    id: "E307",
    code: "E307",
    name: "HOD Computer Cabin",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "HOD",
    description: "Office of the Head of Department, Computer Engineering.",
    keywords: ["e307", "hod comp", "hod computer", "head of department", "cabin", "prof"]
  },
  {
    id: "E308-I",
    code: "E308-I",
    name: "Tutorial Lab (Computer)",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Remedial coding, technical aptitude, and problem-solving hub.",
    keywords: ["e308-i", "e308", "tutorial lab", "coding tutorial"]
  },
  {
    id: "E308-II",
    code: "E308-II",
    name: "Computer Project Lab",
    floor: "2",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "High performance workstation lab for final year capstone project teams.",
    keywords: ["e308-ii", "computer project lab", "be project", "capstone"]
  },

  // Central / Applied Sciences Hub (Level 2)
  {
    id: "F304",
    code: "F304",
    name: "Engineering Physics Lab",
    floor: "2",
    wing: "CENTRAL",
    department: "Applied Sciences",
    category: "LAB",
    description: "Lasers, optics spectrometers, Michelson interferometer, and semiconductor bandgap kits.",
    keywords: ["f304", "physics lab", "applied science", "optics", "spectrometer", "lasers"]
  },
  {
    id: "F305",
    code: "F305",
    name: "Mathematics Staff Room",
    floor: "2",
    wing: "CENTRAL",
    department: "Applied Sciences",
    category: "HOD",
    description: "Faculty cabins for Engineering Mathematics professors.",
    keywords: ["f305", "maths staff", "mathematics", "faculty cabins"]
  },
  {
    id: "F306",
    code: "F306",
    name: "HOD Applied Sciences Cabin",
    floor: "2",
    wing: "CENTRAL",
    department: "Applied Sciences",
    category: "HOD",
    description: "Head of First Year & Applied Sciences Department.",
    keywords: ["f306", "hod applied sciences", "fe coordinator", "head of first year", "cabin"]
  },
  {
    id: "F307",
    code: "F307",
    name: "Engineering Chemistry Lab",
    floor: "2",
    wing: "CENTRAL",
    department: "Applied Sciences",
    category: "LAB",
    description: "Water hardness titrations, pH meters, conductometer, and polymer chemistry setups.",
    keywords: ["f307", "chemistry lab", "applied chemistry", "titrations", "first year"]
  },

  // ==========================================
  // LEVEL 3 (THIRD FLOOR)
  // ==========================================
  // Wing A (Level 3 - E&TC Engineering)
  {
    id: "A401",
    code: "A401",
    name: "FE E&TC Class Room",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "CLASSROOM",
    description: "First Year E&TC classroom.",
    keywords: ["a401", "fe etc", "classroom"]
  },
  {
    id: "A402",
    code: "A402",
    name: "SE E&TC Class Room",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "CLASSROOM",
    description: "Second Year E&TC classroom.",
    keywords: ["a402", "se etc", "classroom"]
  },
  {
    id: "A403-I",
    code: "A403-I",
    name: "Basic Electronics Lab",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Diodes, BJTs, MOSFETs, rectifiers, and oscilloscopes bench.",
    keywords: ["a403-i", "a403", "basic electronics", "oscilloscope", "dso", "bjt"]
  },
  {
    id: "A403-II",
    code: "A403-II",
    name: "Analog Electronics Lab",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Op-amps (741), active filters, oscillators, and multi-vibrators.",
    keywords: ["a403-ii", "analog electronics", "op-amp", "filters"]
  },
  {
    id: "A404",
    code: "A404",
    name: "E&TC Department Store",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "ADMIN",
    description: "Components store, ICs, resistors, test probes, and consumables.",
    keywords: ["a404", "store", "components store"]
  },
  {
    id: "A405",
    code: "A405",
    name: "Lavatory",
    floor: "3",
    wing: "A",
    department: "Facilities",
    category: "WASHROOM",
    description: "Third floor washroom in Wing A.",
    keywords: ["a405", "washroom", "toilet", "lavatory"]
  },
  {
    id: "A406-I",
    code: "A406-I",
    name: "Communication Lab",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "AM/FM modulation, QPSK, fiber optics transmitters, and spectrum analyzers.",
    keywords: ["a406-i", "a406", "communication lab", "optical fiber", "spectrum analyzer"]
  },
  {
    id: "A406-II",
    code: "A406-II",
    name: "Microwave Lab",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Klystron test bench, Gunn oscillator, waveguides, and horn antenna kits.",
    keywords: ["a406-ii", "microwave lab", "klystron", "waveguide", "antenna"]
  },
  {
    id: "A407",
    code: "A407",
    name: "E&TC Faculty Room",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "HOD",
    description: "Faculty cabins for third floor E&TC professors.",
    keywords: ["a407", "faculty room", "etc teachers"]
  },
  {
    id: "A408",
    code: "A408",
    name: "E&TC Seminar Hall / AV Hall",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "SEMINAR",
    description: "Audio-visual seminar hall equipped for student project presentations.",
    keywords: ["a408", "seminar hall", "av hall", "audio visual", "auditorium"]
  },
  {
    id: "F401-I",
    code: "F401-I",
    name: "Tutorial Room",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "CLASSROOM",
    description: "Small group tutorial room.",
    keywords: ["f401-i", "f401", "tutorial"]
  },
  {
    id: "F401-II",
    code: "F401-II",
    name: "ME Research Lab",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Post-graduate master's degree research and simulation facility.",
    keywords: ["f401-ii", "me research", "post graduate", "mtech"]
  },
  {
    id: "F402",
    code: "F402",
    name: "Faculty Room",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "HOD",
    description: "Teaching assistants and adjunct professors cabins.",
    keywords: ["f402", "faculty room"]
  },
  {
    id: "F403",
    code: "F403",
    name: "PG Lab (VLSI & Embedded)",
    floor: "3",
    wing: "A",
    department: "E&TC Engineering",
    category: "LAB",
    description: "Advanced post-graduate laboratory for embedded systems research.",
    keywords: ["f403", "pg lab", "vlsi research"]
  },

  // Wing B (Level 3 - AI & Data Science)
  {
    id: "B401",
    code: "B401",
    name: "AI & DS Class Room 1",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "CLASSROOM",
    description: "Third Year Artificial Intelligence & Data Science classroom.",
    keywords: ["b401", "ai ds classroom 1", "artificial intelligence", "data science", "classroom"]
  },
  {
    id: "B402",
    code: "B402",
    name: "AI & DS Class Room 2",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "CLASSROOM",
    description: "Second Year AI & Data Science lecture hall.",
    keywords: ["b402", "ai ds classroom 2", "aids", "classroom"]
  },
  {
    id: "B403-I",
    code: "B403-I",
    name: "AI Software Lab I",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "LAB",
    description: "Machine learning, PyTorch, Scikit-learn, and neural networks computer lab.",
    keywords: ["b403-i", "b403", "ai software lab", "machine learning", "pytorch", "neural networks"]
  },
  {
    id: "B403-II",
    code: "B403-II",
    name: "AI Software Lab II",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "LAB",
    description: "Deep learning, Computer Vision (OpenCV), and NLP transformers laboratory.",
    keywords: ["b403-ii", "deep learning", "computer vision", "opencv", "nlp"]
  },
  {
    id: "B404",
    code: "B404",
    name: "UPS Room (AI Wing)",
    floor: "3",
    wing: "B",
    department: "Facilities",
    category: "ADMIN",
    description: "Power backup for AI GPU server clusters.",
    keywords: ["b404", "ups", "ai ups"]
  },
  {
    id: "B405",
    code: "B405",
    name: "Lavatory",
    floor: "3",
    wing: "B",
    department: "Facilities",
    category: "WASHROOM",
    description: "Third floor washroom in Wing B.",
    keywords: ["b405", "washroom", "toilet", "lavatory"]
  },
  {
    id: "B406-I",
    code: "B406-I",
    name: "AI Software Lab III",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "LAB",
    description: "Big data analytics, Hadoop, Apache Spark, and Tableau visualization lab.",
    keywords: ["b406-i", "b406", "big data", "hadoop", "spark", "data analytics"]
  },
  {
    id: "B406-II",
    code: "B406-II",
    name: "AI Software Lab IV",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "LAB",
    description: "Data warehousing, ETL pipelines, and statistical modeling with R/Python.",
    keywords: ["b406-ii", "data warehousing", "r programming", "statistics"]
  },
  {
    id: "B407",
    code: "B407",
    name: "HOD AI & DS Cabin",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "HOD",
    description: "Office of the Head of Department, Artificial Intelligence & Data Science.",
    keywords: ["b407", "hod ai ds", "hod aids", "head of department", "cabin", "ai hod"]
  },
  {
    id: "B408-I",
    code: "B408-I",
    name: "AI Software Lab V",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "LAB",
    description: "Generative AI, LLM fine-tuning, and conversational agents laboratory.",
    keywords: ["b408-i", "b408", "genai", "llm", "generative ai", "software lab"]
  },
  {
    id: "B408-II",
    code: "B408-II",
    name: "AI Software Lab VI",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "LAB",
    description: "Data mining, predictive analytics, and automated decision systems.",
    keywords: ["b408-ii", "data mining", "predictive analytics"]
  },
  {
    id: "B409",
    code: "B409",
    name: "AI & DS Faculty Room",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "HOD",
    description: "Faculty cabins for AI & DS department professors.",
    keywords: ["b409", "ai faculty", "staff room"]
  },
  {
    id: "B410",
    code: "B410",
    name: "Tutorial Room",
    floor: "3",
    wing: "B",
    department: "AI & Data Science",
    category: "CLASSROOM",
    description: "AI problem solving and seminar tutorial room.",
    keywords: ["b410", "tutorial room"]
  },

  // Wing D (Level 3 - Robotics & Automation / MCA)
  {
    id: "D401",
    code: "D401",
    name: "R&A Class Room 1",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "CLASSROOM",
    description: "Fourth Year Robotics & Automation classroom.",
    keywords: ["d401", "ra classroom 1", "robotics classroom"]
  },
  {
    id: "D402",
    code: "D402",
    name: "R&A Class Room 2",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "CLASSROOM",
    description: "Third Year Robotics & Automation classroom.",
    keywords: ["d402", "ra classroom 2", "robotics"]
  },
  {
    id: "D403-I",
    code: "D403-I",
    name: "SY MCA Div-B Class Room",
    floor: "3",
    wing: "D",
    department: "MCA Department",
    category: "CLASSROOM",
    description: "Second Year Master of Computer Applications Division B.",
    keywords: ["d403-i", "d403", "sy mca", "mca division b", "mca classroom"]
  },
  {
    id: "D403-II",
    code: "D403-II",
    name: "R&A Class Room II",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "CLASSROOM",
    description: "Robotics elective and interdisciplinary lecture room.",
    keywords: ["d403-ii", "ra classroom ii"]
  },
  {
    id: "D404",
    code: "D404",
    name: "NSS & Student Activity Office",
    floor: "3",
    wing: "D",
    department: "Student Affairs",
    category: "ADMIN",
    description: "National Service Scheme (NSS) unit office and student cultural council room.",
    keywords: ["d404", "nss", "student council", "cultural", "social work"]
  },
  {
    id: "D405",
    code: "D405",
    name: "Lavatory",
    floor: "3",
    wing: "D",
    department: "Facilities",
    category: "WASHROOM",
    description: "Third floor washroom in Wing D.",
    keywords: ["d405", "washroom", "toilet", "lavatory"]
  },
  {
    id: "D406-I",
    code: "D406-I",
    name: "Advanced Mechatronics Lab",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Vision sensors, servo gripper testing, and multi-axis CNC micro-machining.",
    keywords: ["d406-i", "d406", "advanced mechatronics", "vision systems", "servos"]
  },
  {
    id: "D406-II",
    code: "D406-II",
    name: "Humanoid & Bipedal Robotics Lab",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "LAB",
    description: "Biped walking kinematics, exoskeleton research, and balance control platforms.",
    keywords: ["d406-ii", "humanoid lab", "biped", "exoskeleton", "robotics research"]
  },
  {
    id: "D407",
    code: "D407",
    name: "Faculty Room (R&A)",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "HOD",
    description: "Faculty work space for Robotics & MCA teachers.",
    keywords: ["d407", "faculty room"]
  },
  {
    id: "D408-I",
    code: "D408-I",
    name: "Robotics Seminar Hall",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "SEMINAR",
    description: "Department seminar hall for robotics project reviews and workshops.",
    keywords: ["d408-i", "d408", "robotics seminar", "seminar hall"]
  },
  {
    id: "D408-II",
    code: "D408-II",
    name: "Department Library (R&A)",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "LIBRARY",
    description: "Robotics journals, IEEE transaction reprints, and component manuals.",
    keywords: ["d408-ii", "dept library", "robotics books"]
  },
  {
    id: "D409-I",
    code: "D409-I",
    name: "Faculty Room",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "HOD",
    description: "Faculty consultation office.",
    keywords: ["d409-i", "d409", "faculty room"]
  },
  {
    id: "D409-II",
    code: "D409-II",
    name: "Tutorial Room 1",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "CLASSROOM",
    description: "Tutorial solving classroom.",
    keywords: ["d409-ii", "tutorial 1"]
  },
  {
    id: "D409-III",
    code: "D409-III",
    name: "Tutorial Room 2",
    floor: "3",
    wing: "D",
    department: "Robotics & Automation",
    category: "CLASSROOM",
    description: "Robotics math & kinematics discussion classroom.",
    keywords: ["d409-iii", "tutorial 2"]
  },

  // Wing E (Level 3 - Computer Engineering)
  {
    id: "E401",
    code: "E401",
    name: "Computer Class Room 3",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "CLASSROOM",
    description: "Third Year Computer Engineering classroom.",
    keywords: ["e401", "computer classroom 3", "te computer"]
  },
  {
    id: "E402",
    code: "E402",
    name: "Computer Class Room 4",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "CLASSROOM",
    description: "Final Year Computer Engineering classroom.",
    keywords: ["e402", "computer classroom 4", "be computer"]
  },
  {
    id: "E403",
    code: "E403",
    name: "Computer Class Room 5",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "CLASSROOM",
    description: "Computer Engineering lecture hall 5.",
    keywords: ["e403", "computer classroom 5"]
  },
  {
    id: "E404",
    code: "E404",
    name: "UPS Room",
    floor: "3",
    wing: "E",
    department: "Facilities",
    category: "ADMIN",
    description: "Level 3 UPS facility.",
    keywords: ["e404", "ups"]
  },
  {
    id: "E405",
    code: "E405",
    name: "Lavatory",
    floor: "3",
    wing: "E",
    department: "Facilities",
    category: "WASHROOM",
    description: "Third floor washroom in Wing E.",
    keywords: ["e405", "washroom", "toilet", "lavatory"]
  },
  {
    id: "E406",
    code: "E406",
    name: "Room E406 (Programming Lab V)",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Operating systems and computer laboratory.",
    keywords: ["e406", "e406-i", "computer", "lab"]
  },
  {
    id: "E406-I",
    code: "E406-I",
    name: "Programming Lab V (Computer)",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Operating systems, Linux kernel compilation, shell scripting, and virtualization lab.",
    keywords: ["e406-i", "e406", "programming lab 5", "operating systems", "linux"]
  },
  {
    id: "E406-II",
    code: "E406-II",
    name: "Programming Lab VI (Computer)",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "LAB",
    description: "Compiler design, Lex & Yacc, computer graphics, and OpenGL lab.",
    keywords: ["e406-ii", "programming lab 6", "compiler", "graphics", "opengl"]
  },
  {
    id: "E407",
    code: "E407",
    name: "Computer Faculty Room",
    floor: "3",
    wing: "E",
    department: "Computer Engineering",
    category: "HOD",
    description: "Senior faculty cabins for Computer Engineering staff.",
    keywords: ["e407", "faculty room", "computer professors"]
  },
  {
    id: "E408-I",
    code: "E408-I",
    name: "Programming Lab V (CSD)",
    floor: "3",
    wing: "E",
    department: "Computer Science & Design",
    category: "LAB",
    description: "UI/UX interface engineering, Figma, Flutter, and web frontend lab.",
    keywords: ["e408-i", "e408", "csd lab", "ui ux", "frontend", "flutter"]
  },
  {
    id: "E408-II",
    code: "E408-II",
    name: "Programming Lab VI (CSD)",
    floor: "3",
    wing: "E",
    department: "Computer Science & Design",
    category: "LAB",
    description: "Human-computer interaction (HCI), game design (Unity), and VR development.",
    keywords: ["e408-ii", "hci", "game design", "unity", "vr", "csd"]
  },

  // ==========================================
  // LEVEL 4 (FOURTH FLOOR)
  // ==========================================
  // Wing A (Level 4 - PG Section / FE Classrooms)
  {
    id: "A501",
    code: "A501",
    name: "FE Class Room 1 (Above ETC)",
    floor: "4",
    wing: "A",
    department: "Applied Sciences / PG",
    category: "CLASSROOM",
    description: "Spacious First Year / PG classroom on Fourth Floor overlooking north courtyard.",
    keywords: ["a501", "fe classroom", "level 4", "pg classroom"]
  },
  {
    id: "A502",
    code: "A502",
    name: "FE Class Room 2 (Above ETC)",
    floor: "4",
    wing: "A",
    department: "Applied Sciences / PG",
    category: "CLASSROOM",
    description: "First Year lecture hall 2 on Fourth Floor.",
    keywords: ["a502", "fe classroom 2", "level 4"]
  },

  // Wing B (Level 4 - MBA Department)
  {
    id: "B501",
    code: "B501",
    name: "MBA-I Class Room",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "CLASSROOM",
    description: "First Year Master of Business Administration amphitheater style classroom.",
    keywords: ["b501", "mba-i", "mba 1", "mba classroom", "business"]
  },
  {
    id: "B502",
    code: "B502",
    name: "MBA-II Class Room",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "CLASSROOM",
    description: "Second Year MBA lecture hall with multimedia executive seating.",
    keywords: ["b502", "mba-ii", "mba 2", "mba classroom"]
  },
  {
    id: "B503",
    code: "B503",
    name: "MBA Seminar Hall",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "SEMINAR",
    description: "Executive boardroom and corporate seminar hall for MBA case studies.",
    keywords: ["b503", "mba seminar hall", "executive hall", "boardroom", "seminar"]
  },
  {
    id: "B504",
    code: "B504",
    name: "Maintenance Store",
    floor: "4",
    wing: "B",
    department: "Facilities",
    category: "ADMIN",
    description: "Level 4 maintenance supplies.",
    keywords: ["b504", "maintenance"]
  },
  {
    id: "B505",
    code: "B505",
    name: "Lavatory",
    floor: "4",
    wing: "B",
    department: "Facilities",
    category: "WASHROOM",
    description: "Fourth floor washroom in Wing B.",
    keywords: ["b505", "washroom", "toilet", "lavatory"]
  },
  {
    id: "B506-I",
    code: "B506-I",
    name: "MBA Tutorial Room 1",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "CLASSROOM",
    description: "Group discussions, mock interviews, and case study tutorial room.",
    keywords: ["b506-i", "b506", "mba tutorial", "group discussion", "case study"]
  },
  {
    id: "B506-II",
    code: "B506-II",
    name: "MBA Tutorial Room 2",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "CLASSROOM",
    description: "Financial analytics and management discussion room.",
    keywords: ["b506-ii", "tutorial room 2", "mba"]
  },
  {
    id: "B507",
    code: "B507",
    name: "HOD MBA Cabin",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "HOD",
    description: "Office of the Head of Department, Management Studies (MBA).",
    keywords: ["b507", "hod mba", "head of department mba", "management hod", "cabin"]
  },
  {
    id: "B508",
    code: "B508",
    name: "MBA Computer Lab",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "LAB",
    description: "Business analytics, SPSS, Excel modeling, and ERP simulation lab.",
    keywords: ["b508", "mba computer lab", "spss", "business analytics", "erp"]
  },
  {
    id: "B509",
    code: "B509",
    name: "MBA Staff Room 1",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "HOD",
    description: "Marketing and HR faculty cabins.",
    keywords: ["b509", "mba staff", "faculty"]
  },
  {
    id: "B510",
    code: "B510",
    name: "MBA Staff Room 2",
    floor: "4",
    wing: "B",
    department: "MBA Department",
    category: "HOD",
    description: "Finance and Operations faculty cabins.",
    keywords: ["b510", "mba staff 2", "finance faculty"]
  },

  // Wing D (Level 4 - MCA Department)
  {
    id: "D501",
    code: "D501",
    name: "FYMCA Div-A Class Room",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "CLASSROOM",
    description: "First Year MCA Division A classroom.",
    keywords: ["d501", "fymca div-a", "mca division a", "classroom"]
  },
  {
    id: "D502",
    code: "D502",
    name: "FYMCA Div-B Class Room",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "CLASSROOM",
    description: "First Year MCA Division B classroom.",
    keywords: ["d502", "fymca div-b", "mca division b", "classroom"]
  },
  {
    id: "D503-I",
    code: "D503-I",
    name: "MCA Lab-III",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "LAB",
    description: "Web technologies, MEAN/MERN stack, and cloud app development lab.",
    keywords: ["d503-i", "d503", "mca lab 3", "mern", "web development"]
  },
  {
    id: "D503-II A",
    code: "D503-II A",
    name: "SYMCA Div-A Class Room",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "CLASSROOM",
    description: "Second Year MCA Division A lecture hall.",
    keywords: ["d503-ii a", "symca", "symca div a", "mca"]
  },
  {
    id: "D503-II B",
    code: "D503-II B",
    name: "MCA Faculty Room",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "HOD",
    description: "Teaching staff and consultation cabins.",
    keywords: ["d503-ii b", "faculty room", "mca teachers"]
  },
  {
    id: "D504",
    code: "D504",
    name: "UPS Room",
    floor: "4",
    wing: "D",
    department: "Facilities",
    category: "ADMIN",
    description: "Power backup room for Level 4 MCA labs.",
    keywords: ["d504", "ups"]
  },
  {
    id: "D505",
    code: "D505",
    name: "Lavatory",
    floor: "4",
    wing: "D",
    department: "Facilities",
    category: "WASHROOM",
    description: "Fourth floor washroom in Wing D.",
    keywords: ["d505", "washroom", "toilet", "lavatory"]
  },
  {
    id: "D506-I",
    code: "D506-I",
    name: "MCA Lab I",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "LAB",
    description: "Object-oriented programming, C++, Java, and data structures laboratory.",
    keywords: ["d506-i", "d506", "mca lab 1", "java", "data structures"]
  },
  {
    id: "D506-II",
    code: "D506-II",
    name: "MCA Lab II",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "LAB",
    description: "Database management, Oracle, NoSQL, and software testing lab.",
    keywords: ["d506-ii", "mca lab 2", "oracle", "database"]
  },
  {
    id: "D507",
    code: "D507",
    name: "HOD MCA Cabin",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "HOD",
    description: "Office of the Head of Department, Master of Computer Applications (MCA).",
    keywords: ["d507", "hod mca", "head of department mca", "cabin"]
  },
  {
    id: "D508-I",
    code: "D508-I",
    name: "MCA Tutorial Room",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "CLASSROOM",
    description: "Aptitude and project discussion room.",
    keywords: ["d508-i", "d508", "tutorial", "mca"]
  },
  {
    id: "D508-II",
    code: "D508-II",
    name: "MCA Seminar Hall",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "SEMINAR",
    description: "Auditorium hall for MCA seminars, guest webinars, and symposiums.",
    keywords: ["d508-ii", "mca seminar hall", "seminar hall"]
  },
  {
    id: "D509",
    code: "D509",
    name: "MCA Department Library",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "LIBRARY",
    description: "MCA technical textbooks, dissertations, and computer science references.",
    keywords: ["d509", "dept library", "mca library"]
  },
  {
    id: "D510",
    code: "D510",
    name: "MCA Faculty Room 1",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "HOD",
    description: "Faculty cabins for MCA professors.",
    keywords: ["d510", "faculty room 1", "mca staff"]
  },
  {
    id: "D511",
    code: "D511",
    name: "MCA Faculty Room 2",
    floor: "4",
    wing: "D",
    department: "MCA Department",
    category: "HOD",
    description: "Faculty cabins for MCA professors.",
    keywords: ["d511", "faculty room 2", "mca staff"]
  },

  // Wing E (Level 4 - Computer Science & Design / CSD)
  {
    id: "E501",
    code: "E501",
    name: "CSD Class Room 1",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "CLASSROOM",
    description: "Computer Science & Design (CSD) lecture theater 1.",
    keywords: ["e501", "csd classroom 1", "computer science and design", "classroom"]
  },
  {
    id: "E502",
    code: "E502",
    name: "CSD Class Room 2",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "CLASSROOM",
    description: "Computer Science & Design (CSD) lecture theater 2.",
    keywords: ["e502", "csd classroom 2", "csd"]
  },
  {
    id: "E503-I",
    code: "E503-I",
    name: "CSD Programming Lab I",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "LAB",
    description: "Visual design, typography, Figma UI prototyping, and front-end development.",
    keywords: ["e503-i", "e503", "csd lab 1", "ui design", "figma", "visual design"]
  },
  {
    id: "E503-II",
    code: "E503-II",
    name: "CSD Programming Lab II",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "LAB",
    description: "Full-stack software design, React, Next.js, and mobile interaction lab.",
    keywords: ["e503-ii", "csd lab 2", "react", "fullstack", "mobile design"]
  },
  {
    id: "E504",
    code: "E504",
    name: "UPS Room",
    floor: "4",
    wing: "E",
    department: "Facilities",
    category: "ADMIN",
    description: "Level 4 power conditioning and UPS.",
    keywords: ["e504", "ups"]
  },
  {
    id: "E505",
    code: "E505",
    name: "Lavatory",
    floor: "4",
    wing: "E",
    department: "Facilities",
    category: "WASHROOM",
    description: "Fourth floor washroom in Wing E.",
    keywords: ["e505", "washroom", "toilet", "lavatory"]
  },
  {
    id: "E506-I",
    code: "E506-I",
    name: "CSD Programming Lab III",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "LAB",
    description: "Augmented reality (AR), virtual reality (VR), 3D Blender modeling lab.",
    keywords: ["e506-i", "e506", "csd lab 3", "ar vr", "blender", "3d modeling"]
  },
  {
    id: "E506-II",
    code: "E506-II",
    name: "CSD Programming Lab IV",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "LAB",
    description: "Creative computing, algorithmic art, and generative media synthesis.",
    keywords: ["e506-ii", "csd lab 4", "creative computing", "generative design"]
  },
  {
    id: "E507",
    code: "E507",
    name: "HOD CSD Cabin",
    floor: "4",
    wing: "E",
    department: "Computer Science & Design",
    category: "HOD",
    description: "Office of the Head of Department, Computer Science & Design.",
    keywords: ["e507", "hod csd", "head of department csd", "cabin"]
  },
  {
    id: "E508",
    code: "E508",
    name: "JVN Hall",
    floor: "4",
    wing: "E",
    department: "Institute",
    category: "SEMINAR",
    description: "Renowned JVN Memorial Hall for institutional ceremonies, conferences, and conventions.",
    keywords: ["e508", "jvn hall", "jvn auditorium", "memorial hall", "seminar hall", "conference"]
  }
];
