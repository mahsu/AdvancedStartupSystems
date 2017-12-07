let Code = require('./models/code.js');
let Job = require('./models/job.js');
let User = require('./models/user.js');

const users = [
    {
        "name": {
            "first": "Alan",
            "last": "Liu"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+16099073676",
        "type": "requester",
        "busy": false
    },
    {
        "name": {
            "first": "Amy",
            "last": "Smith"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+16099073674",
        "type": "requester",
        "busy": false
    },
    {
        "name": {
            "first": "Fisher",
            "last": "Devon"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+160990737876",
        "type": "requester",
        "busy": false
    },
    {
        "name": {
            "first": "Iris",
            "last": "West"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+16599073676",
        "type": "requester",
        "busy": false
    },
    {
        "name": {
            "first": "Alex",
            "last": "Denver"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+16099173676",
        "type": "requester",
        "busy": false
    },
    {
        "name": {
            "first": "Joan",
            "last": "Holmes"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "6097073676",
        "type": "requester",
        "busy": false
    },
    {
        "name": {
            "first": "Aleo",
            "last": "Noble"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+19172708287",
        "type": "driver",
        "busy": false
    },
    {
        "name": {
            "first": "Steve",
            "last": "Lee"
        },
        "image": "https://19jkon2dxx3g14btyo2ec2u9-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/matt-trainer-rolfer-400x400.jpg",
        "phone": "+16099900674",
        "type": "driver",
        "busy": false
    }
];

const jobs = [
    {
        "details": {
            "numRooms": 2,
            "startTime": "2017-12-06",
            "endTime": "2017-12-10",
            "maxPrice": 450,
            "loc": {
                "type": "Point",
                "coordinates": [-73.9857, 40.7484]
            },
            "description": "Moving my couch"
        },
        "requester": "+16099073676",
        "mover": "+19172708287",
        "jobType": "Move"
    },
    {
        "details": {
            "numRooms": 1,
            "startTime": "2017-12-05",
            "endTime": "2017-12-07",
            "maxPrice": 250,
            "loc": {
                "type": "Point",
                "coordinates": [-73.8331, 40.7675]
            },
            "description": "Moving up in the world."
        },
        "requester": "+16099073676",
        "mover": "+19172708287",
        "jobType": "Move"
    },
    {
        "details": {
            "numRooms": 2,
            "startTime": "2017-12-05",
            "endTime": "2017-12-08",
            "maxPrice": 350,
            "loc": {
                "type": "Point",
                "coordinates": [-73.3857, 40.7584]
            },
            "description": "Moooving ice cream"
        },
        "requester": "+16099073676",
        "mover": "+19172708287",
        "jobType": "Move"
    },
    {
        "details": {
            "numRooms": 1,
            "startTime": "2017-12-05",
            "endTime": "2017-12-09",
            "maxPrice": 150,
            "loc": {
                "type": "Point",
                "coordinates": [-73.9965, 40.7295]
            },
            "description": "Movies"
        },
        "requester": "+16099073676",
        "mover": "+19172708287",
        "jobType": "Move"
    },
    {
        "details": {
            "numRooms": 2,
            "startTime": "2017-12-05",
            "endTime": "2017-12-07",
            "maxPrice": 400,
            "loc": {
                "type": "Point",
                "coordinates": [-73.9626, 40.8075]
            },
            "description": "Moose"
        },
        "requester": "+16099073676",
        "mover": "+19172708287",
        "jobType": "Move"
    },
    {
        "details": {
            "numRooms": 3,
            "startTime": "2017-12-05",
            "endTime": "2017-12-09",
            "maxPrice": 750,
            "loc": {
                "type": "Point",
                "coordinates": [-73.9626, 40.8075]
            },
            "description": "Melvin"
        },
        "requester": "+16099073676",
        "mover": null,
        "jobType": "Move"
    }
];

Code.removeAll(() => {
    Job.removeAll(() => {
        User.removeAll(() => {
            User.insertMany(users, (err) => {
                if (err) console.log(err);
            });
            Job.insertMany(jobs, (err) => {
                if (err) console.log(err);
            })
        })
    })
});