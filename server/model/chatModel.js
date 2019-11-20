const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
const textDetails = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
var textModel = mongoose.model("messageDetails", textDetails)
//returs all the users of this app 
exports.getUsers = (req, callback) => {
    try {

        register.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
// takes in the message,receiver and the recipient and stores it the dataBase
exports.sendMessage = (req, callback) => {
    try {
        console.log('model', req.body.from)
        var letter = new textModel({
            'from': req.body.from,
            'to': req.body.to,
            'msg': req.body.msg
        })
        letter.save((err, data) => {
            if (err) callback(err)
            else callback(data)
        })
    } catch (e) {
        console.log(e)
    }
}

// check in database for all the messages between the 2 users and callback them
exports.getMessage = (req, callback) => {
    try {
        textModel.find({
                $or: [{
                    'from': req.body.from,
                    'to': req.body.to
                }, {
                    'from': req.body.to,
                    'to': req.body.from
                }]
            }).then((data) => {
                callback(data)
            })
            .catch((err) => {
                callback(err)
            })

    } catch (e) {
        console.log(e);
    }
}