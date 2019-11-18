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

exports.getUsers = (req, callBack) => {
    try {

        model.getUsers(req, (err, data) => {
            if (err) {
                callBack(err)
            } else {
                callBack(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
exports.sendMessage = (req, callback) => {
    try {
        console.log("get user in services");
        model.sendMessage(req, (err, data) => {
            if (err) callback(err)
            else callback(null, data)
        })
    } catch (e) {
        console.log(e)
    }
}

// call the model to fetch the chat between 2 users
exports.getMessage = (req, callback) => {
    try {
        model.getMessage(req, (err, data) => {
            if (err) callback(err)
            else callback(null, data)
        })
    } catch (e) {
        console.log(e);
    }
}