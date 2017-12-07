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
                            twilio.messages.create({
                                from: config.twilio.from_phone,
                                to: phone,
                                body: "Verification code: " + code
                            }).then((msg) => {
                                console.log("Message sent");
                                return res.status(200).json({
                                    phone,
                                    type: user.type
                                })
                            });
                        } else {
                            return res.sendStatus(500)
                        }
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


router.get("/jobs/available", function (req, res, next) {
    Job.find({mover: null}, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.json(user)
        }
    });
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

    User.findOne({type: "driver"}, (err, mover) => {
        if (err) {
            console.log(err);
        }
        if (mover == null) {
            return res.sendStatus(500);
        }
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
            requester: req.body.phone,
            mover: mover.phone,
            jobType: req.body.type
        });
        console.log(job);
        mover.busy = true;
        mover.save();
        job.save((err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            } else {
                console.log("response");
                return res.status(200).json({
                    job,
                    mover
                });
            }
        });

    });
});

router.put('/job/{jobid}', function (req, res, next) {

});

module.exports = router;
