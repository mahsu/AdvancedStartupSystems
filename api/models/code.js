const mongoose = require('mongoose');
const randomstring = require('randomstring');


var codeSchema = new mongoose.Schema({
    phone: {type: String},
    code: {type: String}
});

codeSchema.statics.removeAll = function (cb) {
    this.remove(function (err, res) {
        if (err) {
            console.log(err);
        }
        cb(res)
    });
};

codeSchema.statics.verify = function (phone, code, cb) {
    let _this = this;
    this.findOne({phone}, function (err, res) {
        if (err) {
            console.error(err);
            return cb(false);
        }
        console.log(res.code, code);
        if (res !== null && res.code === code) {
            _this.remove({phone}, function (err, res) {
                if (err) {
                    console.error(err);
                    return cb(false);
                }
                console.log("returning true");
                return cb(true);
            })
        } else {
            return cb(false);
        }
    });
};

codeSchema.statics.add = function (phone, cb) {
    let _this = this;
    let code = randomstring.generate({
        length: 5,
        charset: 'numeric',
        capitalization: 'lowercase'
    });
    this.findOne({phone}, (err, res) => {
        if (err) {
            console.error(err);
            return cb(null);
        }
        let newCode = res;
        if (res) {
            res.code = code;
        } else {
            newCode = new _this({phone, code});
        }
        newCode.save((err, res) => {
            if (err) {
                console.error(err);
                return cb(null);
            }
            return cb(code);
        });
    });
};


module.exports = mongoose.model("Code", codeSchema);