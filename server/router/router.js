//Router for different API's
try {
    const express = require('express');
    const router = express.Router();
    const userController = require('../controller/userController')
    const token = require('../middleware/token')
    //APIs
    router.post('/register', userController.register)
    router.post('/login', userController.login)
    router.post('/forgotPassword', userController.forgotPassword)
    router.post('/resetPassword/:token', token.verify, userController.resetPassword)
    router.get('/getUsers', userController.getUsers)
    router.post('/sendMessage', userController.sendMessage)
    router.get('/getMessage', userController.getMessage)
    module.exports = router;
} catch (e) {
    console.log(e);
};