//Router for different API's
try {
    const express = require('express');
    const userRouter = express.Router();
    const userController = require('../controller/userController')
    const token = require('../middleware/token')
    //APIs
    userRouter.post('/register', userController.register)
    userRouter.post('/login', userController.login)
    userRouter.post('/forgotPassword', userController.forgotPassword)
    userRouter.post('/resetPassword/:token', token.verify, userController.resetPassword)
    module.exports = userRouter;
} catch (err) {
    console.log(err);
};