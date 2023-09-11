const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { actionChannel } = require('redux-saga/effects');

router.get('/:id/id', (req, res) => {
    const groupId = req.query.groupId; // Access the groupId from the query parameters
    const gameId = req.query.gameId;
    console.log("Inside GET /activity_responses/id req.query", req.query)
    const queryParams = [gameId, groupId];
    const query = `SELECT ar.*, "user".username
    FROM activity_responses ar
    JOIN activity a ON a.id = ar.activity_id
    JOIN "user" ON "user".id = ar.user_id
    WHERE a.game_id = $1
    AND ar.group_id = $2`;
    pool.query(query, queryParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get activity_responses/id groups', err);
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    console.log("Inside POST /activity_responses");
    const userId = req.body.userId;
    const groupId = Number(req.body.groupId);
    const activity_id = req.body.activity_id[0].id;
    const start_time = req.body.start_time;
    const activityDate = req.body.date;
    const end_time = req.body.end_time;

    console.log("userId=", userId, "groupId=", groupId, "activity_id=", activity_id, "date", activityDate, "start_time=", start_time, "end_time=", end_time);

    const queryText = `
    INSERT INTO activity_responses (user_id, activity_id, "Date", "time_start", "time_end", group_id)
    VALUES (\$1, \$2, \$3, \$4, \$5, \$6)
  `;
  const queryParams = [userId, activity_id, activityDate, start_time, end_time, groupId];
    console.log("QueryParams=", queryParams);
    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log("ERROR on POST activityResponse", req.body);
        });
});


module.exports = router;