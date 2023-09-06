const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  console.log("REQ", req.query[0])
  const userid = req.query[0]; // access the id from the request body
  console.log("INSIDE get /groups", userid);
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
      console.log('ERROR: Get all groups', err);
      res.sendStatus(500)
    })

});

module.exports = router;