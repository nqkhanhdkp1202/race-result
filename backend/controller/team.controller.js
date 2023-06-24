const pool = require("../database/index");

const teamController = {
  getTeamList: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM TEAMS");
      res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error",
      });
    }
  },
  getTeamByID: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM TEAMS WHERE team_id = ?",
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
  createTeam: async (req, res) => {
    try {
      const { team_name } = req.body;
      const query = "INSERT INTO TEAMS (team_name) VALUES( ? )";
      const [rows, fields] = await pool.query(query, [team_name]);
      res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error",
      });
    }
  },

  updateTeam: async (req, res) => {
    try {
      const { team_name } = req.body;
      const { id } = req.params;
      const query = "UPDATE TEAMS SET team_name = ? where team_id = ?";
      const [rows, fields] = await pool.query(query, [team_name, id]);
      res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error",
      });
    }
  },
};

module.exports = teamController;
