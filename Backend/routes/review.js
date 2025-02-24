const express = require("express");
const router = express.Router();
// const passwordHash = require('password-hash');
const pool = require('../pool.js');
var kafka = require('../kafka/client');

router.post('/', (req, res) => {
    rating = parseInt((req.body.rating))
    console.log(rating)
    console.log(req.body.rest_id);
    kafka.make_request("restSignUp_topic", { "path": "addRestReview", "id": req.body.rest_id, "body": req.body }, function (err, results) {
      //console.log("In make request call back");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.end(results.message);
        } else {
          return res.end(results.message);
        }
      }
    })
    })

  router.get('/:rest_id', (req, res) => {
    console.log(req.params.rest_id);
  kafka.make_request("restSignUp_topic", { "path": "getRestReview", "body": req.params.rest_id}, function (err, results) {
    console.log(results);
    console.log("In make request call back", results);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      //console.log("Inside else", results);
      if (results.status === 200) {
        return res.status(results.status).send(results.data);
      } else {
        return res.status(results.status).send(results.errors);
      }
    }
  })
})

module.exports = router;