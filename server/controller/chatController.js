const chatService = require("../services/chatService")
//returns all the Users of the application
exports.getUsers = (req, res) => {
    try {
        chatService.getUsers(req, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(data);
            }
        })
    } catch (e) {
        console.log(e)
    }
}
//send message to one of the user
exports.sendMessage = (req, res) => {
    try {
        chatService.sendMessage(req, (err, data) => {
            if (err) res.status(422).send(err)
            else res.status(200).send(data)
        })
    } catch (e) {
        console.log(e)
    }
}
//get all the messages
exports.getMessage = (req, res) => {
    try {
        chatService.getMessage(req, (err, data) => {
            if (err) res.status(422).send(err)
            else res.status(200).send(data)
        })
    } catch (e) {
        console.log(e)
    }
}