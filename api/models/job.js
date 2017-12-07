const mongoose = require('mongoose');


var jobSchema = new mongoose.Schema({
    details: {
        numRooms: {type: Number},
        startTime: {type: Date},
        endTime: {type: Date},
        maxPrice: {type: Number},
        loc: {
            type: {type: String, default: "Point"},
            coordinates: [Number] // convention is lon, lat
        },
        description: {type: String} //todo validation
    },
    requester: {type: String},
    mover: {type: String, default: null},
    jobType: {type: String}
});
jobSchema.index({loc: '2dsphere'});

jobSchema.statics.removeAll = function (cb) {
    this.remove(function (err, res) {
        if (err) {
            console.log(err);
        }
        cb(res)
    });
};

jobSchema.statics.findClosestJob = function(phone, point, cb) {
    var findParams = {
        mover: {
            $ne: phone
        },
        loc: {
            $near: {
                $geometry: point,
                $maxDistance: 10000
            }
        }
    };

    this.find(findParams, (err, res) => {
        if (err) {
            console.log(err)
        }
        return cb(res);
    })

};
module.exports = mongoose.model("Job", jobSchema);