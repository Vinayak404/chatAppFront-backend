/********************************************************************************************************************
 * @Execution : default nodemon : cmd> server.js
 * @Purpose : chatApp backend.
 * @description : build a chatapp using node, Express and mongo db
 * @overview : chat application 
 * @author : Vinayaka.S.V <vinayakavastrad@gmail.com>
 * @version : 1.0
 * @since : 02-NOV-2019
 *
 *******************************************************************************************************************/
//importing express framework 
const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const userRouters = require('./router/userRouter.js');
const chatRouters = require('./router/chatRouter');
const controller = require('./controller/chatController');
require('dotenv').config();
app.use(bodyParser.json()); //to support json encode bodies
app.use(bodyParser.urlencoded({
    extended: true
})) //app.use() middleware as the callback function 
app.use(expressValidator());
//mongoose (mongodb) to create and access database
const dbconfig = require('./configuration/dbConfig.js');
const mongoose = require('mongoose');
mongoose.connect(dbconfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log('Could not connect to the database', err);
        process.exit();
    })


app.use('/', userRouters);
app.use('/', chatRouters);

app.use(express.static('../client'));
//Server listening to the server 3000
var server = app.listen(3000, () => {
    console.log("Server is listing on port 3000");
});
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log('user connected now...')
    socket.on('newMsg', data => {
        console.log('data of socket', data);
        controller.sendMessage(data);

    })

})

module.exports = app