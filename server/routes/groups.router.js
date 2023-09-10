const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  const userid = req.query[0]; // access the id from the request body
  console.log("Inside GET /groups/id", userid);
  const queryParams = [userid];
  const query = `SELECT "groups".*
  FROM "groups"
  JOIN "user_groups" ON "groups"."id" = "user_groups"."group_id"
  WHERE "user_groups"."user_id" = $1;`;
  pool.query(query, queryParams)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all user groups', err);
      res.sendStatus(500)
    })
});

// add a new group
router.post('/', (req, res) => {
  console.log("Inside POST /groups")
  const groupName = req.body.groupName
  const gameIds = req.body.selectGames.map(game => game.value)
  const userIds = req.body.selectedPlayers.map(players => players.value)

  console.log("gameIds=", gameIds, "userIds=", userIds)

  const queryText = `
  WITH new_group AS (
    INSERT INTO "groups" ("group_name")
    VALUES (\$1)
    RETURNING "id"
  ), 
  new_group_games AS (
    INSERT INTO "group_games" ("group_id", "game_id")
    SELECT new_group.id, unnest(\$2::integer[]) AS game_id
    FROM new_group
  )
  INSERT INTO "user_groups" ("user_id", "group_id")
  SELECT unnest(\$3::integer[]) AS user_id, new_group.id
  FROM new_group;
`;
  const queryParams = [groupName, gameIds, userIds]
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