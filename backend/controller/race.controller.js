const pool = require('../database/index')

const raceController = {
  getRaceList: async (req, res) => {
    try {
        const [rows,fields] = await pool.query("SELECT * FROM RACES")
        res.json({ data: rows });
    } catch (err) {
      console.log(err);
      res.json({
        state: "Error"
      })
    }
  },
  getRaceByID: async (req,res) => {
    try{
        const {id} = req.params
        const [rows,fields] = await pool.query("SELECT * FROM RACES WHERE race_id = ?", [id])
        res.json({ data: rows });
    }
    catch(err){
        console.log(err);
        res.json({
            state: "Error"
          }) 
    }
  },
};

module.exports = raceController;