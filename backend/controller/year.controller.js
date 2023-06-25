const pool = require("../database/index");

const yearController = {
  
  getYearList: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM YEARS");
      res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error",
      });
    }
  },
  
  getYearByID: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM yearS WHERE year_id = ?",
        [id]
      );
      res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error",
      });
    }
  },
};

module.exports = yearController;
