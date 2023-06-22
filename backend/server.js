const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "race_result",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// enable CORS
app.use(cors());

// Get all records from database
function getRecordsFromDatabase(table) {
  return (req, res) => {
    connection.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) {
        console.error(`Error retrieving ${table}:`, err);
        res.status(500).json({ error: `Error retrieving ${table}` });
        return;
      }
      res.json(results);
    });
  };
}

// Get a record from database by id
function getRecordById(table) {
  return (req, res) => {
    const { id } = req.params;
    connection.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      [id],
      (err, results) => {
        if (err) {
          console.error(`Error retrieving ${table}:`, err);
          res.status(500).json({ error: `Error retrieving ${table}` });
          return;
        }
        res.json(results);
      }
    );
  };
}

// Get a record from database by id
function getRecordByCondition(table, condition) {
  return (req, res) => {
    const { id } = req.params;
    connection.query(
      `SELECT * FROM ${table} WHERE ${condition} = ?`,
      [id],
      (err, results) => {
        if (err) {
          console.error(`Error retrieving ${table}:`, err);
          res.status(500).json({ error: `Error retrieving ${table}` });
          return;
        }
        res.json(results);
      }
    );
  };
}

const createRecord = (tableName, recordInfo, res) => {
  let queryValues = [];
  let queryPlaceholders = [];

  for (let key in recordInfo) {
    if (recordInfo[key] === "") {
      queryValues.push(null);
      queryPlaceholders.push("?");
      continue;
    }

    queryValues.push(recordInfo[key]);
    queryPlaceholders.push("?");
  }

  const query = `INSERT INTO ${tableName} (${Object.keys(recordInfo).join(
    ", "
  )}) VALUES (${queryPlaceholders.join(", ")})`;

  connection.query(query, queryValues, (err, results) => {
    if (err) {
      console.error(`Error creating new record in ${tableName}:`, err);
      res
        .status(500)
        .json({ error: `Error creating new record in ${tableName}` });
      return;
    }

    const recordId = results.insertId;
    const newRecord = { id: recordId, ...recordInfo };
    res.status(201).json(newRecord);
  });
};


app.get("/api", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.formula1.com/en/results.html/2023/team.html`);

    const data = await page.evaluate(() => {
      const dataList = Array.from(
        document.querySelectorAll(".resultsarchive-filter-wrap")
      );
      const team = Array.from(dataList[2].querySelectorAll("li"));

      let insertedId;

      team.forEach((item, index) => {
        const teamItem = item.querySelector("a > span").innerText;
        const obj = { team_id: index, team_name: teamItem };
        try {
          insertedId = createRecord("TEAMS", obj);
        } catch (error) {
          insertedId = "Error";
        }
      });
      return insertedId;
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

app.get("/api/teams", getRecordsFromDatabase("teams"));

app.get("/api/teams/:id", getRecordById("teams"));

app.get("/api/teams/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM TEAMS t, year WHERE p.IDCategory = c.ID and c.ID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error retrieving product:", err);
        res.status(500).json({ error: "Error retrieving product" });
        return;
      }
      res.json(results);
    }
  );
});

//========================================== END SCRIPT ==================================
// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
