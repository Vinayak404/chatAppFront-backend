var model = require('../model/userModel')
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