const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log("Inside GET all /activity");
  const query = `SELECT * FROM activity;`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all activity', err);
      res.sendStatus(500)
    })

});

module.exports = router;