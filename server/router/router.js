//Router for different API's
try {
    const express = require('express');
    const router = express.Router();
    const userController = require('../controller/userController')
    const chatController = require('../controller/chatController')
    const token = require('../middleware/token')
    //APIs
    router.post('/register', userController.register)
    router.post('/login', userController.login)
    router.post('/forgotPassword', userController.forgotPassword)
    router.post('/resetPassword/:token', token.verify, userController.resetPassword)
    router.get('/getUsers', chatController.getUsers)
    router.post('/sendMessage', chatController.sendMessage)
    router.get('/getMessage', chatController.getMessage)
    module.exports = router;
} catch (e) {
    console.log(e);
};