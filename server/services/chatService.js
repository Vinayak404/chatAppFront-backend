var model = require('../model/userModel')
//redirects to the model where it fetches all the users of the chatapp
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
//redirects to the model where it takes the message from the user ,from,to and stores it in the database
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

//redirects to the model where it fetches the chat between 2 users from the database.
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