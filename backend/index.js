const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();
const raceRouter = require('./routes/race.router')

const port = process.env.PORT || 3000;
app.use(cors());

app.use("/api/v1", raceRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
