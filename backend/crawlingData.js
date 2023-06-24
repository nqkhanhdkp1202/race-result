const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const allpage = await browser.newPage();

  await allpage.goto("https://www.formula1.com/en/results.html/2023/team.html");

  const teamsHandles = await page.$$(".resultsarchive-table > tbody > tr");

  const option = await page.$$(".resultsarchive-filter");

  const yearsHandles = await option[0].$$("li > a");

  let year_id = 1;

  let team_id = 1;

  let driver_id = 1;

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

  for (const team of teamsHandles) {
    try {
      const team_name = await page.evaluate(
        (el) => el.querySelector("a.dark.bold").textContent,
        team
      );
      fs.appendFile("teams.csv", `${team_id},${team_name}\n`, function (err) {
        if (err) throw err;
        console.log("Saved");
      });
      team_id++;
    } catch (error) {
      console.log(error);
    }
  }

  await browser.close();
})();
