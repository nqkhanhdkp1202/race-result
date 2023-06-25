const fs = require("fs");

const raceCrawl = async (browser) => {
  
  const page = await browser.newPage();

  await page.goto("https://www.formula1.com/en/results.html/2023/races.html");

  let race_id = 1;

  const racesHandle = await page.$$(".resultsarchive-table > tbody > tr");

  for (const raceHandle of racesHandle) {
    try {
      const race_place = await page.evaluate(
        (el) => el.querySelector("a.ArchiveLink").textContent,
        raceHandle
      );
      const date = await page.evaluate(
        (el) => el.querySelector("td.dark.hide-for-mobile").textContent,
        raceHandle
      );
      const team = await page.evaluate(
        (el) => el.querySelector("td.semi-bold.uppercase").textContent,
        raceHandle
      );
      const laps = await page.evaluate(
        (el) => el.querySelector("td.bold.hide-for-mobile").textContent,
        raceHandle
      );
      const time = await page.evaluate(
        (el) => el.querySelector("td.dark.bold.hide-for-tablet").textContent,
        raceHandle
      );
      const firstName = await page.evaluate(
        (el) => el.querySelector("span.hide-for-tablet").textContent,
        raceHandle
      );
      const lastName = await page.evaluate(
        (el) => el.querySelector("span.hide-for-mobile").textContent,
        raceHandle
      );
      let driver_name = firstName + " " + lastName;
      fs.appendFile(
        "races.csv",
        `${race_id},${race_place.trim()},${date},${driver_name},${team},${laps},${time}\n`,
        function (err) {
          if (err) throw err;
          console.log("Saved");
        }
      );
      race_id++;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = raceCrawl;
