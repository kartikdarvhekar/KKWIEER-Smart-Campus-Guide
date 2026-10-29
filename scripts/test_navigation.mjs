import { calculateRoute } from '../js/services/pathfinder.js';
import { VERIFIED_ROUTES, getVerifiedRoute } from '../js/data/verified-routes.js';

console.log('=== KKWIEER CAMPUS GUIDE NAVIGATION VERIFICATION TEST ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failCount++;
  }
}

// ----------------------------------------------------
// Test Case 1: Route containing a Left Turn
// ----------------------------------------------------
console.log('--- TEST 1: Left Turn Route ---');
const rE102 = calculateRoute('MAIN-ENT', 'E102');
assert(rE102 && rE102.verifiedRouteAvailable, 'Route to E102 calculates correctly');
const hasLeftTurn = rE102.steps.some(s => s.action === 'TURN_LEFT');
assert(hasLeftTurn, 'E102 route contains a verified TURN_LEFT step');
console.log(`  E102 steps: ${rE102.steps.map(s => `${s.action} (${s.instruction.slice(0, 30)}...)`).join(' -> ')}`);

// ----------------------------------------------------
// Test Case 2: Route containing a Right Turn
// ----------------------------------------------------
console.log('\n--- TEST 2: Right Turn Route ---');
const rE101 = calculateRoute('MAIN-ENT', 'E101');
assert(rE101 && rE101.verifiedRouteAvailable, 'Route to E101 calculates correctly');
const hasRightTurn = rE101.steps.some(s => s.action === 'TURN_RIGHT');
assert(hasRightTurn, 'E101 route contains a verified TURN_RIGHT step');
console.log(`  E101 steps: ${rE101.steps.map(s => `${s.action} (${s.instruction.slice(0, 30)}...)`).join(' -> ')}`);

// ----------------------------------------------------
// Test Case 3: Route with a Straight Corridor
// ----------------------------------------------------
console.log('\n--- TEST 3: Straight Corridor Route ---');
const rE403R2 = calculateRoute('MAIN-ENT', 'E403', 2);
assert(rE403R2 && rE403R2.verifiedRouteAvailable, 'Route to E403 (Route 2) calculates correctly');
const hasStraight = rE403R2.steps.some(s => s.instruction.toLowerCase().includes('straight'));
assert(hasStraight, 'E403 Route 2 contains a straight corridor navigation step');
console.log(`  E403 (R2) Step 4: "${rE403R2.steps[3].instruction}"`);

// ----------------------------------------------------
// Test Case 4: Route involving Stairs / Floor Change
// ----------------------------------------------------
console.log('\n--- TEST 4: Stairs / Floor Change Route ---');
const rE201 = calculateRoute('MAIN-ENT', 'E201');
assert(rE201 && rE201.verifiedRouteAvailable, 'Route to E201 calculates correctly');
const hasStairs = rE201.steps.some(s => s.action === 'STAIRS_UP' || s.isFloorChange);
assert(hasStairs, 'E201 route contains a verified STAIRS_UP step');
assert(rE201.floor === '1', 'Target floor is correctly set to Level 1');
console.log(`  E201 Floor change: From G to ${rE201.floor}, steps: ${rE201.steps.length}`);

// ----------------------------------------------------
// Test Case 5: E401, E402, E403, and E406 on Third-Floor Map
// ----------------------------------------------------
console.log('\n--- TEST 5: Third-Floor E Wing Routes (E401, E402, E403, E406) ---');

// E401
const rE401 = calculateRoute('MAIN-ENT', 'E401');
assert(rE401 && rE401.floor === '3', 'E401 is on Floor 3');
assert(rE401.department === 'Computer Engineering', 'E401 is Computer Engineering');
assert(rE401.steps.length === 5, 'E401 has exactly 5 steps as supplied');
assert(rE401.steps[3].action === 'TURN_LEFT', 'E401 Step 4 is TURN_LEFT towards Computer Engg board');
assert(rE401.steps[4].action === 'TURN_RIGHT', 'E401 Step 5 is TURN_RIGHT into second room on right');
const segsE401 = rE401.mapSegments['3'];
assert(segsE401 && segsE401.length === 4, 'E401 Floor 3 has 4 connected corridor waypoints');
assert(segsE401[segsE401.length - 1].x === 580 && segsE401[segsE401.length - 1].y === 420, 'E401 final waypoint terminates at E401 (580, 420)');

// E402
const rE402 = calculateRoute('MAIN-ENT', 'E402');
assert(rE402 && rE402.floor === '3', 'E402 is on Floor 3');
assert(rE402.steps[4].action === 'TURN_RIGHT', 'E402 Step 5 is TURN_RIGHT into first room on right');
const segsE402 = rE402.mapSegments['3'];
assert(segsE402[segsE402.length - 1].x === 580 && segsE402[segsE402.length - 1].y === 380, 'E402 final waypoint terminates at E402 (580, 380)');

// E403 Route 1 (via board)
const rE403R1 = calculateRoute('MAIN-ENT', 'E403', 1);
assert(rE403R1 && rE403R1.floor === '3', 'E403 Route 1 is on Floor 3');
assert(rE403R1.steps[4].instruction.includes('left-hand side'), 'E403 Route 1 destination is room on left side');
const segsE403R1 = rE403R1.mapSegments['3'];
assert(segsE403R1[segsE403R1.length - 1].x === 415 && segsE403R1[segsE403R1.length - 1].y === 345, 'E403 Route 1 terminates at E403 left room (415, 345)');

// E403 Route 2 (via North corridor - kept distinct)
assert(rE403R1.id !== rE403R2.id, 'E403 Route 1 and Route 2 are kept completely separate and not merged');
assert(rE403R2.mapSegments['3'][1].y === 250, 'E403 Route 2 traverses North corridor at y=250');

// E406
const rE406 = calculateRoute('MAIN-ENT', 'E406');
assert(rE406 && rE406.floor === '3', 'E406 is on Floor 3');
assert(rE406.steps.length === 6, 'E406 has 6 steps');
assert(rE406.steps[4].action === 'TURN_LEFT' && rE406.steps[4].instruction.includes('washroom'), 'E406 Step 5 walks towards washroom');
assert(rE406.steps[5].action === 'TURN_RIGHT', 'E406 Step 6 turns right with destination on left');
const segsE406 = rE406.mapSegments['3'];
assert(segsE406[segsE406.length - 1].x === 415 && segsE406[segsE406.length - 1].y === 445, 'E406 terminates at E406 room (415, 445)');

// ----------------------------------------------------
// Verify all corridor geometry has 90-degree orthogonal segments
// ----------------------------------------------------
console.log('\n--- Corridor Geometry Orthogonality Check ---');
[rE401, rE402, rE403R1, rE406, rE403R2].forEach(r => {
  const pts = r.mapSegments['3'];
  let isOrthogonal = true;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = Math.abs(pts[i+1].x - pts[i].x);
    const dy = Math.abs(pts[i+1].y - pts[i].y);
    if (dx !== 0 && dy !== 0) {
      isOrthogonal = false;
      console.error(`Diagonal segment found in ${r.destinationCode}: (${pts[i].x},${pts[i].y}) -> (${pts[i+1].x},${pts[i+1].y})`);
    }
  }
  assert(isOrthogonal, `${r.destinationCode} (${r.routeKey || r.id}) corridor segments are 100% orthogonal (90-degree turns along walkable hallways)`);
});

// ----------------------------------------------------
// Verify All 29 Routes in verified-routes.js
// ----------------------------------------------------
console.log('\n--- VERIFYING ALL 29 REGISTERED ROUTES ---');
let all29Valid = true;
for (const vRoute of VERIFIED_ROUTES) {
  const calc = calculateRoute(vRoute.startPoint, vRoute.destinationId, vRoute.variant);
  if (!calc || !calc.verifiedRouteAvailable) {
    all29Valid = false;
    console.error(`Failed to calculate route for ${vRoute.id} (${vRoute.destinationCode})`);
  }
}
assert(all29Valid, `All ${VERIFIED_ROUTES.length} verified routes calculate properly without errors`);

console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
}
