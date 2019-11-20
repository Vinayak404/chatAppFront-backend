//Router for different API's
try {
    const express = require('express');
    const chatRouter = express.Router();
    const chatController = require('../controller/chatController')
    //APIs
    chatRouter.get('/getUsers', chatController.getUsers)
    chatRouter.post('/sendMessage', chatController.sendMessage)
    chatRouter.get('/getMessage', chatController.getMessage)
    module.exports = chatRouter;
} catch (e) {
    console.log(e);
};