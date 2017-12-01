var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/auth/number", function(req, res, next) {

});

router.post("/auth/code", function(req, res, next) {

});


router.get("/jobs", function(req, res, next) {

});

router.put('/job/new', function(req, res, next) {
  //create job in db
    //match with mover
    //return details of job + mover
});

router.put('/job/{jobid}', function(req, res, next) {

})
module.exports = router;
