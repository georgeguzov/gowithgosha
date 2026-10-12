const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const h = document.evaluate("//h2[contains(., 'больше, чем')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    h?.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await page.waitForTimeout(500);

  for (let i = 0; i < 10; i++) {
    await page.click('button[aria-label="Следующее фото"]', { force: true });
    await page.waitForTimeout(2000); // generous
  }
  const info = await page.evaluate(() => {
    const group = document.querySelector('button[aria-label="Следующее фото"]').closest('.group');
    const imgs = [...group.querySelectorAll('img')].map(i => ({src: i.currentSrc || i.src, opacity: getComputedStyle(i.closest('[style]') || i).opacity}));
    const label = group.querySelector('p')?.textContent;
    return { imgCount: imgs.length, imgs, label };
  });
  console.log(JSON.stringify(info, null, 1));
  await page.screenshot({ path: 'recheck-apostles.png' });
  await browser.close();
})();
