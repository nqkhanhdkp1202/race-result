const fs = require("fs");
const puppeteer = require("puppeteer");

const yearCrawl = async (browser) => {

  const page = await browser.newPage();

  await page.goto("https://www.formula1.com/en/results.html/2023/team.html");

  const option = await page.$$(".resultsarchive-filter");

  const yearsHandles = await option[0].$$("li > a");

  let year_id = 1;

  for (const yearItem of yearsHandles) {
    try {
      const year = await page.evaluate(
        (el) => el.querySelector("span").textContent,
        yearItem
      );
      fs.appendFile("years.csv", `${year_id},${year}\n`, function (err) {
        if (err) throw err;
        console.log("Saved");
      });
      year_id++;
    } catch (error) {
      console.log(error);
    }
  }


};

module.exports = yearCrawl;