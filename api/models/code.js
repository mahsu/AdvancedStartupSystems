const mongoose = require('mongoose');
const randomstring = require('randomstring');


var codeSchema = new mongoose.Schema({
    phone: {type: String},
    code: {type: String}
});

codeSchema.statics.removeAll = function () {
    this.remove(function (err, res) {
        if (err) {
            console.log(err);
        }
        return res;
    });
};

codeSchema.statics.verify = function (phone, code) {
    let _this = this;
    this.findOne({phone}, function (err, res) {
        if (err) {
            console.error(err);
            return false;
        }
        if (res !== null && res.code === code) {
            _this.remove({phone}, function (err, res) {
                if (err) {
                    console.error(err);
                    return false;
                }
                return true;
            })
        }
        return false;
    });
};

codeSchema.statics.add = function (phone, cb) {
    let _this = this;
    let code = randomstring.generate({
        length: 5,
        charset: 'alphanumeric',
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
            newCode = new _this({phone, res});
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