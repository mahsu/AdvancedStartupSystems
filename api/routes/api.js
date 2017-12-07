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
            User.findOne({phone}, (err, user) => {
                console.log(user);
                if (user == null) {
                    return res.sendStatus(500);
                } else {
                    Code.add(phone, (code) => {
                        if (code) {
                            console.log(code);
                            return res.status(200).json({
                                phone,
                                type: user.type
                            });
                        }
                        return res.sendStatus(500);
                    });
                }
            })
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

router.put('/user/new', function (req, res, next) {
    twilio.lookups.v1
        .phoneNumbers(req.body.phone)
        .fetch()
        .then((number) => {
            var phone = number.phoneNumber;
            let user = new User({
                name: {
                    first: req.body.first,
                    last: req.body.last
                },
                email: req.body.email,
                image: req.body.image,
                phone: phone,
                type: req.body.type,
                busy: false
            });

            user.save((err) => {
                if (err) {
                    return res.sendStatus(500)
                } else {
                    return res.sendStatus(200)
                }
            });
        })
        .catch((error) => {
            console.log(error);
            return res.sendStatus(500);
        });
});

router.put('/job/new', function (req, res, next) {
    let job = new Job({
        details: {
            numRooms: parseInt(req.body.numRooms),
            startTime: new Date(req.body.startTime),
            endTime: new Date(req.body.endTime),
            maxPrice: parseInt(req.body.maxPrice),
            loc: {
                type: "Point",
                coordinates: [parseFloat(req.body.lon), parseFloat(req.body.lat)], //[lon,lat]
            },
            description: req.body.description
        },
        requester: req.body.phone, //todo actual id
        mover: null,//todo
        jobType: {type: String}
    });
    console.log(job);
    return res.status(200).json({status: true});
    //create job in db
    //match with mover
    //return details of job + mover
});

router.put('/job/{jobid}', function (req, res, next) {

});

module.exports = router;
