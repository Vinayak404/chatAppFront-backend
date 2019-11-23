var model = require('../model/userModel');
//Checks for errors and calls model
exports.register = (req, callback) => {
    try {
        model.Register(req, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })
    } catch (e) {
        console.log(e);
    }
}

exports.login = (req, callback) => {
    try {
        model.Login(req, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })
    } catch (e) {
        console.log(e);
    }
}




exports.forgotPassword = (req, callback) => {
    try {
        model.ForgotPassword(req, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })
    } catch (e) {
        console.log(e);
    }
}



exports.resetPassword = (req, callback) => {
    try {
        model.ResetPassword(req, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data)
        })
    } catch (e) {
        console.log(e);
    }
}

