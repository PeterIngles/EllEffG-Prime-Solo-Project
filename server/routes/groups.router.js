const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
const { useSelector } = require('react-redux');

router.get('/', (req, res) => {
  const user = useSelector((store) => store.user);
  const { id } = user.id;
  console.log("INSIDE get /group", id)
  const queryParams = [id]
  const query = `SELECT "groups".*
  FROM "groups"
  JOIN "user_groups" ON "groups"."id" = "user_groups"."group_id"
  WHERE "user_groups"."user_id" = $1;`;
  pool.query(query, queryParams)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

module.exports = router;