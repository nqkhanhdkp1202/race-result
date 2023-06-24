const fs = require("fs");
const puppeteer = require("puppeteer");

const teamsCrawl = async (browser) => {

  const page = await browser.newPage();

  await page.goto("https://www.formula1.com/en/results.html/2023/team.html");

  const teamsHandles = await page.$$(".resultsarchive-table > tbody > tr");

  let team_id = 1;

  for (const team of teamsHandles) {
    try {
      const team_name = await page.evaluate(
        (el) => el.querySelector("a.dark.bold").textContent,
        team
      );
      const pts = await page.evaluate(
        (el) => el.querySelector("td.dark.bold").textContent,
        team
      );
      fs.appendFile("teams.csv", `${team_id},${team_name},${pts}\n`, function (err) {
        if (err) throw err;
        console.log("Saved");
      });
      team_id++;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = teamsCrawl;