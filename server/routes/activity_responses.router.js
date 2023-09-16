const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id/id', (req, res) => {
    const groupId = req.query.groupId; // Access the groupId from the query parameters
    const gameId = req.query.gameId;
    console.log("Inside GET /activity_responses/id req.query", req.query)
    const queryParams = [gameId, groupId];
    const query = `SELECT ar.*, u.username
    FROM activity_responses ar
    JOIN "user" u ON u.id = ar.user_id
    WHERE ar.game_id = $1
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

router.get('/', (req, res) => {
    const userId = req.query.userId;
    console.log("Inside GET user /activity_responses/ req.query", req.query)
    const queryParams = [userId];
    const query = `SELECT 
    g.title AS game_title,
    activity_responses."Date",
    activity_responses.time_start,
    activity_responses.time_end,
    grp.group_name
FROM 
    activity_responses
JOIN 
    games g ON activity_responses.game_id = g.id
JOIN 
    groups grp ON activity_responses.group_id = grp.id
WHERE 
    activity_responses.user_id = $1;`;
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
    const gameId = req.body.gameId
    const start_time = req.body.start_time;
    const activityDate = req.body.date;
    const end_time = req.body.end_time;

    console.log("userId=", userId, "groupId=", groupId, "gameId=", gameId, "date", activityDate, "start_time=", start_time, "end_time=", end_time);

    const queryText = `
    INSERT INTO activity_responses (user_id, game_id, "Date", "time_start", "time_end", group_id)
    VALUES (\$1, \$2, \$3, \$4, \$5, \$6)
  `;
    const queryParams = [userId, gameId, activityDate, start_time, end_time, groupId];
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

router.delete('/', (req, res) => {
    console.log("Inside DELETE /activity_responses", req.body);
    const userId = req.body.userId;
    const groupId = Number(req.body.groupId);
    const gameId = req.body.gameId;
    const activityDate = req.body.date;

    console.log("userId=", userId, "groupId=", groupId, "gameId=", gameId, "date", activityDate);

    const queryText = `
    DELETE FROM activity_responses
    WHERE "Date" = $1
        AND user_id = $2
        AND group_id = $3 
        AND game_id = $4;`;
    const queryParams = [activityDate, userId, groupId, gameId];
    console.log("QueryParams=", queryParams);
    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log("ERROR on DELETE activityResponse", req.body);
        });
});

router.put('/', (req, res) => {
    console.log("Inside PUT /activity_responses", req.body);
    const userId = req.body.data.userId;
    const groupId = Number(req.body.data.groupId);
    const start_time = req.body.data.startTime;
    const activityDate = req.body.data.date;
    const end_time = req.body.data.endTime;

    console.log("userId=", userId, "groupId=", groupId, "date", activityDate, "start_time=", start_time, "end_time=", end_time);

    const queryText = `
    UPDATE activity_responses
SET time_start = $1, time_end = $2
WHERE group_id = $3 AND "Date" = $4 AND user_id = $5;
`;
    const queryParams = [start_time, end_time, groupId, activityDate, userId];
    console.log("QueryParams=", queryParams);
    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log("ERROR on PUT activityResponse", req.body);
        });
});






module.exports = router;