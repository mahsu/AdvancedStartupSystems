const mongoose = require('mongoose');

const USER_TYPES = "requester driver".split(" ");

var userSchema = new mongoose.Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    email: {type: String, required: true, lowercase: true, trim: true, index: {unique: true}},
    image: {type: String},
    phone: {type: String},
    type: {type: String, enum: USER_TYPES},
    busy: {type: Boolean}
});


module.exports = mongoose.model("User", userSchema);