const mongoose = require('mongoose');


var jobSchema = new mongoose.Schema({
    details: {
        numRooms: {type: Number},
        startTime: {type: Date},
        endTime: {type: Date},
        maxPrice: {type: Number},
        loc: {
            type: {type: String},
            coordinates: [Number] // convention is lon, lat
        },
        description: {type: String} //todo validation
    },
    requester: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    mover: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    jobType: {type: String}
});


module.exports = mongoose.model("Job", jobSchema);