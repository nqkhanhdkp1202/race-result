const pool = require("../database/index");

const driverController = {

  getDriverList: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM Driver");
      res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error",
      });
    }
  },

  getDriverByID: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM DRIVER WHERE race_id = ?",
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

module.exports = driverController;
