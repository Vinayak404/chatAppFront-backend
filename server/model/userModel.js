const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
const userData = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
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
})
var textModel = mongoose.model("messageDetails", textDetails)

var register = mongoose.model("users", userData);

// check for email in database, ENCRYPT the password and register it to the database"
exports.Register = (req, callback) => {

    try {
        register.findOne({
            "email": req.body.email
        }, (err, data) => {
            if (data) callback("Existing");
            else {
                bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                    var userDetails = new register({
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "email": req.body.email,
                        "password": encrypted
                    })
                    userDetails.save((err, data) => {
                        if (err) {
                            callback(err);
                        } else callback(null, data);
                    })
                })

            }


            console.log("model end")
        })
    } catch (e) {
        console.log(e);
    }
}
// compares the user provided password and the password in the db before next step 
exports.Login = (req, callback) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) {
            bcrypt.compare(req.body.password, data.password, (err, sucess) => {
                if (sucess)
                    callback(null, data);
                else
                    callback("password is incorrect");
            })
        } else callback("email doesnot match");
    })

}
//
exports.ForgotPassword = (req, callback) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) {
            console.log(data)
            callback(null, data)
        } else {
            callback("invalid user email");
        }
    })

}

exports.ResetPassword = (req, callback) => {
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        register.updateOne({
            "_id": req.decoded.payload
        }, {
            "password": encrypted
        }, (err, data) => {
            if (data)
                callback(null, data);
            else
                callback("error");


        })
    })

}


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

exports.sendMessage = (req, callback) => {
    try {
        console.log("model s");
        bcrypt.hash(req.body.msg, 10, (err, encrypted) => {
            console.log('model', req.body.from)
            var letter = new textModel({
                'from': req.body.from,
                'to': req.body.to,
                'msg': encrypted
            })
            letter.save((err, data) => {
                if (err) callback(err)
                else callback(data)
            })
        })
    } catch (e) {
        console.log(e)
    }
}

// check in database for all the message between the 2 users and callback them
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
        }), (err, data) => {
            if (err) callback(err)
            else console.log(data), callback(null, data)
        }
    } catch (e) {
        console.log(e);
    }
}