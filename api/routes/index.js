var express = require('express');
var router = express.Router();

const config = require('../config');

const twilio = require('twilio')(config.twilio.prod_account, config.twilio.prod_token);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post("/auth/phone", function (req, res, next) {
    twilio.lookups.v1
        .phoneNumbers(req.body.phone)
        .fetch()
        .then((number) => {
            console.log(number.phoneNumber);
            return res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            return res.sendStatus(500);
        });
});

router.post("/auth/code", function (req, res, next) {

});


router.get("/jobs", function (req, res, next) {

});

router.put('/job/new', function (req, res, next) {
    //create job in db
    //match with mover
    //return details of job + mover
});

router.put('/job/{jobid}', function (req, res, next) {

})
module.exports = router;
