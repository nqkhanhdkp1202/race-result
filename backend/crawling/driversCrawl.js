const fs = require("fs");

const driverCrawl = async (browser) => {
  
  const driverpage = await browser.newPage();

  await driverpage.goto(
    "https://www.formula1.com/en/results.html/2023/drivers.html"
  );

  let driver_id = 1;

  const driverHandles = await driverpage.$$(
    ".resultsarchive-table > tbody > tr"
  );

  for (const driverHandle of driverHandles) {
    try {
      const firstName = await driverpage.evaluate(
        (el) => el.querySelector(".hide-for-tablet").textContent,
        driverHandle
      );
      const lastName = await driverpage.evaluate(
        (el) => el.querySelector(".hide-for-mobile").textContent,
        driverHandle
      );
      const team_name = await driverpage.evaluate(
        (el) =>
          el.querySelector(".grey.semi-bold.uppercase.ArchiveLink").textContent,
        driverHandle
      );
      const nationaly = await driverpage.evaluate(
        (el) => el.querySelector("td.dark.semi-bold.uppercase").textContent,
        driverHandle
      );
      const pts = await driverpage.evaluate(
        (el) => el.querySelector("td.dark.bold").textContent,
        driverHandle
      );
      let driver_name = firstName + " " + lastName;
      fs.appendFile(
        "drivers.csv",
        `${driver_id},${driver_name},${nationaly},${team_name},${pts}\n`,
        function (err) {
          if (err) throw err;
          console.log("Saved");
        }
      );
      driver_id++;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = driverCrawl;
