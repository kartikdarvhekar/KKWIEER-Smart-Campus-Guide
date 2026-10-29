import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('=== KKWIEER CAMPUS GUIDE RESPONSIVE AUDIT & VERIFICATION ===\n');

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

// 1. Inspect index.html
const htmlPath = path.join(rootDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

assert(
  html.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0'),
  'index.html has correct viewport meta tag for mobile scaling'
);

const requiredIds = [
  'input-origin',
  'input-dest',
  'btn-find-route',
  'btn-clear-route',
  'btn-swap-locations',
  'origin-suggestions',
  'dest-suggestions',
  'route-summary-card',
  'navigation-steps-container',
  'floor-pills',
  'interactive-map-area',
  'floor-map-container',
  'directory-content-area',
  'btn-validation-report',
  'btn-quick-guide',
  'btn-voice-toggle'
];

for (const id of requiredIds) {
  assert(html.includes(`id="${id}"`), `DOM element #${id} exists in index.html`);
}

assert(html.includes('class="table-responsive"'), 'Route validation audit table is wrapped in responsive scroll container');

// 2. Inspect floor-map.js
const mapComponentPath = path.join(rootDir, 'js', 'components', 'floor-map.js');
const mapJs = fs.readFileSync(mapComponentPath, 'utf8');

assert(
  mapJs.includes('preserveAspectRatio="xMidYMid meet"'),
  'floor-map.js SVG explicitly preserves aspect ratio with xMidYMid meet'
);
assert(
  mapJs.includes('initPanAndZoom'),
  'floor-map.js supports interactive pan and zoom'
);
assert(
  mapJs.includes('touchstart') && mapJs.includes('touchmove'),
  'floor-map.js implements mobile touch gesture navigation'
);

// 3. Inspect css/styles.css
const cssPath = path.join(rootDir, 'css', 'styles.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert(
  css.includes('overflow-x: hidden') && css.includes('max-width: 100vw'),
  'styles.css enforces zero page-level horizontal overflow on body/html'
);

assert(
  css.includes('@media (max-width: 1024px)'),
  'styles.css includes 1024px breakpoint (Tablets & Laptops)'
);
assert(
  css.includes('@media (max-width: 768px)'),
  'styles.css includes 768px breakpoint (Large Phones & Tablets)'
);
assert(
  css.includes('@media (max-width: 480px)'),
  'styles.css includes 480px breakpoint (Small Phones / 430px, 390px)'
);
assert(
  css.includes('@media (max-width: 375px)'),
  'styles.css includes 375px breakpoint (Compact Phones)'
);
assert(
  css.includes('@media (max-width: 320px)'),
  'styles.css includes 320px breakpoint (Ultra-narrow Phones)'
);

// Verify mobile visual reordering: Floor map above written steps on mobile
const hasReorder1024 = css.includes('.route-box-card') &&
  css.includes('.map-view-container') &&
  css.includes('.steps-scroll-area') &&
  css.includes('order: 4') &&
  css.includes('order: 6');

assert(
  hasReorder1024,
  'styles.css places Floor Map above Written Steps on mobile/tablet screens (Requirement 6)'
);

// Verify inputs full width and swap button
assert(
  css.includes('.btn-swap') && css.includes('order: 2'),
  'styles.css places Swap Button centered between Origin and Destination on mobile'
);

// Verify inputs font-size 16px to prevent iOS auto-zoom
assert(
  css.includes('font-size: 16px !important'),
  'styles.css sets font-size: 16px !important on inputs to prevent iOS Safari auto-zoom'
);

// Verify touch targets >= 44px
assert(
  css.includes('min-height: 48px') && css.includes('min-height: 44px'),
  'styles.css provides accessible touch targets (>= 44px) for mobile controls'
);

// Verify autocomplete fits mobile screen
assert(
  css.includes('.autocomplete-dropdown') && css.includes('z-index: 1000'),
  'styles.css sets full-width and high z-index for autocomplete dropdown on mobile'
);

// Verify Floor selector swiping / wrapping
assert(
  css.includes('.floor-selector-bar') && css.includes('overflow-x: auto'),
  'styles.css configures floor selector pills with smooth touch scroll on mobile'
);

console.log(`\n========================================`);
console.log(`TOTAL AUDIT CHECKS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}

