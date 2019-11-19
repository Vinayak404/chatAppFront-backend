const userService = require("../services/userService")
const tokenGenerate = require('../middleware/token');
//returns all the Users of the application
exports.getUsers = (req, res) => {
    try {
        userService.getUsers(req, (err, data) => {
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
        userService.sendMessage(req, (err, data) => {
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
        userService.getMessage(req, (err, data) => {
            if (err) res.status(422).send(err)
            else res.status(200).send(data)
        })
    } catch (e) {
        console.log(e)
    }
}