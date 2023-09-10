const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  console.log("Inside GET all /games");
  const query = `SELECT *
  FROM "games"`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all games', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  const userid = req.query[0]; // access the id from the request body
  console.log("Inside GET /games/id", userid);
  const queryParams = [userid];
  const query = `SELECT games.*
  FROM games
  JOIN group_games ON games.id = group_games.game_id
  WHERE group_games.group_id = $1;`;
  pool.query(query, queryParams)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all groups', err);
      res.sendStatus(500)
    })
});

module.exports = router;