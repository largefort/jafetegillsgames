const puppeteer = require('puppeteer');

async function scrapeGameIcons() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://play.google.com/store/apps/developer?id=5593661644576786185');

  const icons = await page.evaluate(() => {
    const iconElements = document.querySelectorAll('img.cover-image');
    const icons = [];
    iconElements.forEach(icon => {
      icons.push(icon.src);
    });
    return icons;
  });

  await browser.close();
  return icons;
}

scrapeGameIcons().then(icons => {
  console.log(icons);
}).catch(error => {
  console.error('Error scraping game icons:', error);
});
