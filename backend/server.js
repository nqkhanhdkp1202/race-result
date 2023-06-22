const express = require("express");
const puppeteer = require("puppeteer");
const cors = require('cors');

const app = express();
app.use(cors());

app.get("/api/:year/:category", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const { year, category } = req.params;
    await page.goto(
      `https://www.formula1.com/en/results.html/${year}/${category}.html`
    );
    await page.waitForSelector(".resultsarchive-table");

    const data = await page.evaluate(() => {
      const raceItems = Array.from(
        document.querySelectorAll(".resultsarchive-table > tbody > tr")
      );
      const raceResultList = [];

      raceItems.forEach((item) => {
        const grandprix = item.querySelector(".dark").innerText;
        const date = item.querySelector(".dark").nextElementSibling.innerText;
        const car = item.querySelector(".semi-bold").innerText;
        const firstName = item.querySelector("span.hide-for-tablet").innerText;
        const lastName = item.querySelector("span.hide-for-mobile").innerText;
        const shortName = item.querySelector("span.hide-for-mobile").innerText;
        const winner = firstName + " " + lastName;
        const laps = item.querySelector(".bold.hide-for-mobile").innerText;
        const time = item.querySelector(".dark.bold.hide-for-tablet").innerText;
        raceResultList.push({ grandprix, date, winner, car, laps, time });
      });

      return raceResultList;
    });

    await browser.close();

    res.json(data);
  } catch (error) {
    console.error("Crawling error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while crawling the website." });
  }
});

app.get("/api/filter", async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const { year, category, id, address } = req.params;
        await page.goto(`https://www.formula1.com/en/results.html/2023/race-result.html`);

        const data = await page.evaluate(() => {
            const option = Array.from(document.querySelectorAll(".resultsarchive-filter"));
            const yearOption = Array.from(option[0].querySelectorAll("li > a"))
            const categoryOption = Array.from(option[1].querySelectorAll("li > a"))
            const yearOptionList = [];
            const categoryOptionList = [];

            yearOption.forEach((item) => {
            const year = item.querySelector("span").innerText;
            yearOptionList.push({ year });
            });

            categoryOption.forEach((item) => {
              const category = item.querySelector("span").innerText;
              categoryOptionList.push({ category });
              });


            return {yearOptionList, categoryOptionList};
        });

        await browser.close();

        res.json(data);
    } catch (error) {
        console.error("Crawling error:", error);
        res
        .status(500)
        .json({ error: "An error occurred while crawling the website." });
    }
    });

app.use(cors);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
