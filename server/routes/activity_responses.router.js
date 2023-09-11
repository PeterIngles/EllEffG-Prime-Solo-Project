const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

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

module.exports = router;