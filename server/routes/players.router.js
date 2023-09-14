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

router.post('/', (req, res) => {
  console.log("Inside POST /players")
  const groupId = req.body.groupId
  const userIds = req.body.selectedPlayers.map(players => players.value)

  console.log("groupIds=", groupId, "userIds=", userIds)

  const queryText = `
    INSERT INTO user_groups (group_id, user_id)
    VALUES (\$1, unnest(\$2::int[]))
  `;
  const queryParams = [groupId, userIds]
  console.log("QueryParams=", queryParams)
  pool.query(queryText, queryParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("ERROR on POST newGroup", req.body)
    })
});


module.exports = router;