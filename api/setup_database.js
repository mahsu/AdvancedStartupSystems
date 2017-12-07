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

Code.removeAll(() => {
    Job.removeAll(() => {
        User.removeAll(() => {
            let newUsers = users.map((x) => {
                new User(x);
            });
            User.insertMany(users, (err) => {
                if (err) console.log(err);
            });
        })
    })
});