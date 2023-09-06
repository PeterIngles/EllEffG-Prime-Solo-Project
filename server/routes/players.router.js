const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  console.log("Inside GET all /players");
  const query = `SELECT *
  FROM "user"`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all players', err);
      res.sendStatus(500)
    })

});

module.exports = router;