const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");

require('dotenv').config();
const raceRouter = require('./routes/race.router')

const port = process.env.PORT || 3000;
app.use(cors());

app.use("/api/v1", raceRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
