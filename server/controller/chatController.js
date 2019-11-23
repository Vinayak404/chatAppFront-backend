const chatService = require("../services/chatService")
//returns all the Users of the application
exports.getUsers = (req, res) => {
    try {

        chatService.getUsers(req, (err, data) => {
            var response = {}
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(400).send(err);
            } else {
                response.success = true;
                response.result = data;
                return res.status(200).send(data);
            }
        })
    } catch (e) {
        console.log(e)
    }
}
//send message to one of the user
exports.sendMessage = (req) => {
    try {
        console.log("req-->",req);        
        chatService.sendMessage(req, (err, data) => {
            console.log("data in send msg controller-->", data);
            var response = {}
            if (err) {
                response.success = false;
                response.result = err;
                return response;
            } else {
                console.log("res in send msg-->", data);
                response.success = true;
                response.result = data;
                return response;
            }
        })
    } catch (e) {
        console.log(e)
    }
}
//get all the messages
exports.getMessage = (req, res) => {
    try {
        chatService.getMessage(req, (err, data) => {
            var response = {};
            if (err) {
                response.success = false;
                response.result = err;
                return res.status(422).send(err);
            } else {
                response.success = true;
                response.result = data;
                return res.status(200).send(data);
            }
        })
    } catch (e) {
        console.log(e)
    }
}