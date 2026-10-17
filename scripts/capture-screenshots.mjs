// Optional: captures real screenshots of your live projects into /public/projects.
// Usage:  npm i -D playwright && npx playwright install chromium && npm run screenshots
// Then set `image: '/projects/<slug>.jpg'` on each project in lib/projects.ts.
import { chromium } from 'playwright';

const targets = {
  doodledriver: 'https://doodledriver.ai/',
  societyconnect: 'https://societyconnect.ai/',
  'web-journal': 'https://web-journal-jade.vercel.app/',
  'kalinga-kids': 'https://kalingakidss.com/',
  routepilot: 'https://route-pilot.vercel.app/',
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
for (const [slug, url] of Object.entries(targets)) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `public/projects/${slug}.jpg`, type: 'jpeg', quality: 85 });
    console.log('captured', slug);
  } catch (e) {
    console.error('failed', slug, e.message);
  }
}
await browser.close();
