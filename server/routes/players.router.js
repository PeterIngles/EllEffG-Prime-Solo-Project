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

router.get('/:id', (req, res) => {
  console.log("Inside GET group /players", req.params.id);
  const queryParams = [Number(req.params.id)]
  const query = `SELECT username, user_id 
  FROM "user" 
  JOIN "user_groups" 
  ON "user".id = "user_groups".user_id 
  WHERE "user_groups".group_id = $1;`;
  pool.query(query, queryParams)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all players', err);
      res.sendStatus(500)
    });
});

module.exports = router;