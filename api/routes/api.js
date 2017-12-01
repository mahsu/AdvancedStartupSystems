var express = require('express');
var router = express.Router();

const Code = require('../models/code');
const Job = require('../models/job');
const User = require('../models/user');

const config = require('../config');

const twilio = require('twilio')(config.twilio.prod_account, config.twilio.prod_token);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post("/auth/phone", function (req, res, next) {
    if (!req.body.phone) {
        return res.sendStatus(500);
    }
    twilio.lookups.v1
        .phoneNumbers(req.body.phone)
        .fetch()
        .then((number) => {
            var phone = number.phoneNumber;
            console.log(phone);
            Code.add(phone, (code) => {
                if (code) {
                    console.log(code);
                    return res.status(200).send(JSON.stringify({phone}));
                }
                return res.sendStatus(500);
            });
        })
        .catch((error) => {
            console.log(error);
            return res.sendStatus(500);
        });
});

router.post("/auth/code", function (req, res, next) {
    if (!req.body.phone || !req.body.code) {
        console.log("Missing parameters");
        return res.sendStatus(500);
    }
    console.log(req.body);
    Code.verify(req.body.phone, req.body.code, (valid) => {
        let status = 200;
        if (!valid) {
            status = 500;
        }
        return res.sendStatus(status);
    });
});


router.get("/jobs", function (req, res, next) {

});

router.put('/job/new', function (req, res, next) {
    new Job({
        details: {
            numRooms: req.body.numRooms,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            maxPrice: req.body.maxPrice,
            loc: [req.body.lon, req.body.lat],//[lon,lat]
            description: req.body.description //todo validation
        },
        requester: req.body.phone, //todo actual id
        mover: null,//todo
        jobType: {type: String}
    });
    //create job in db
    //match with mover
    //return details of job + mover
});

router.put('/job/{jobid}', function (req, res, next) {

});

module.exports = router;
