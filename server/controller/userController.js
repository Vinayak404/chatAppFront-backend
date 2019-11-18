const userService = require("../services/userService")
const tokenGenerate = require('../middleware/token');
const nodeMail = require('../middleware/nodeMailer')
//Takes the input for registeration, Validates them and service function is applied
exports.register = (req, res) => {
    try {
        req.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        req.checkBody('lastName', 'lastname is invalid').notEmpty().isAlpha();
        req.checkBody('email', 'email is invalid').notEmpty().isEmail();
        req.checkBody('password', 'password is invalid').notEmpty().len(8, 13);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.sucess = false;
            res.status(422).send(response);
            console.log("register error:", error);
            console.log("res", response)
        } else {

            userService.register(req, (err, data) => {
                if (err) {
                    response.sucessss = false;
                    response.data = err;
                    res.status(404).send(response);
                } else {
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }
            })

        }
    } catch (e) {
        console.log(e);
    }
}
//the Login details are collected from the user, Validation is done, and service function is called
exports.login = (req, res) => {
    try {
        console.log("Loging on");
        req.checkBody('email', 'invaild email').notEmpty().isEmail();
        req.checkBody('password', 'inavlid password').notEmpty().len(8, 13);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            res.status("422").send(response);
            console.log("Error in login", error)
        } else {
            userService.login(req, (err, data) => {
                if (err) {
                    response.failure = false;
                    response.data = err;
                    res.status(404).send(response);
                } else {
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}
//email is taken from user input, CHecks for validation error before calling the service function
exports.forgotPassword = (req, res) => {
    try {
        console.log("in forgot");
        req.checkBody('email', 'email is invalid').notEmpty().isEmail();
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            res.status(422).send(response)
        } else {
            userService.forgotPassword(req, (err, data) => {
                if (err) {
                    response.failure = false;
                    response.data = err;
                    res.status(404).send(response);
                } else {
                    let payLoad = data._id;
                    console.log(payLoad)
                    let obj = tokenGenerate.GenerateToken(payLoad);
                    console.log("token", obj);
                    let url = `http://localhost:3000/resetPassword/${obj.token}`
                    console.log("click to reset password", url);
                    nodeMail.sendMailer(url, req.body.email)
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}
//recieves the password datas, validates them and call the service
exports.resetPassword = (req, res) => {
    try {
        console.log("Reset password");
        req.checkBody('password', 'password is invalid').notEmpty().len(8, 13);
        req.checkBody('confirmPassword', 'password is invalid').notEmpty().len(8, 13);
        var error = req.validationErrors();
        if (req.body.password != req.body.confirmPassword)
            var error = "confirmpassword is incorrect";
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            return res.status(422).send(response);
        } else {
            userService.resetPassword(req, (err, data) => {
                if (err) {
                    res.status(404).send(response);
                } else {
                    res.status(200).send(data);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}
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