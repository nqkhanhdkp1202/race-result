const driverCrawl = require('./driversCrawl');
const teamsCrawl = require('./teamsCrawl');
const yearCrawl = require('./yearsCrawl');
const raceCrawl = require('./races.Crawl')
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
      });
      try {
        await yearCrawl(browser);
        await teamsCrawl(browser);
        await driverCrawl(browser);
        await raceCrawl(browser);
      } catch (error) {
        console.log(error);
      }
      await browser.close();
})();