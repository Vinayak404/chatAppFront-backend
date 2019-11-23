app.controller('controllerChat', function ($scope, getUserService, SocketService, $http) {
    console.log('get user controller called...');
    $scope.msgData = []
    $scope.getUser = ($scope) => {
        getUserService.getUserServiceData($scope);
    }
    $scope.getUser($scope);

    /**  
     * get msg controller
     */
    $scope.person = function (x) {
        localStorage.setItem('receiverId', x._id);
        localStorage.setItem('receiverName', x.firstName);
        $scope.getUserMsg();
    }
    /**
     * this method will call get user msg service
     */
    $scope.getUserMsg = function () {
        getUserService.getUserMsgService($scope);
    }

    /**
     * send msg controller
     */
    $scope.sendMsg = function () {
        let sendMsgData = {
            from: localStorage.getItem('senderId'),
            to: localStorage.getItem('receiverId'),
            msg: $scope.msg
        }
        console.log("send msg data--", sendMsgData)
        SocketService.emit("newMsg", sendMsgData);
        $scope.msgData.push(sendMsgData);
    }
    /**
     * listining event
     */
    var senderId = localStorage.getItem('loginId');
    SocketService.on(senderId, function (message) {
        console.log(" message emitted from server ----->", message);
        if (localStorage.getItem('receiverId') == message.to) {
            if ($scope.msgData === undefined) {
                $scope.msgData = message; //assighning message to variable
            } else {
                $scope.msgData.push(message);
                console.log("  in else--->  ", $scope.msgData);
            }
        }
    })

    /**
     * to clear input texr area
     */
    $scope.clearTextArea = function () {
        console.log('in clear test area');
        $scope.msg = '';
    }

    $scope.logout = function () {
        $location.path('/login');
    }

});







// /**
//  * @desc operation starts when chatContrtoller is invoked.
//  * @param userName ,when invoked,fetches the user name from the local storage.
//  * @param getUserName ,calls the chatService.
//  * @param getUsers ,calls the chatService fetches all the available users and filters out the Current.
//  * @param storeMsg,
//  */
// app.controller('controllerChat', function ($scope, chatService, SocketService) {
//     try {
//         console.log('ChatCntr called');
//         $scope.msgData = [];
//         $scope.getUser = function ($scope) {
//             chatService.getUserServiceData($scope);
//         }
//         $scope.getUser($scope);


//         $scope.person = function (x) {
//             localStorage.setItem('receiverId', x._id);
//             localStorage.setItem('receiverName', x.firstName);
//             $scope.getUserMsg();
//         }
//         $scope.getUserMsg = function () {
//             chatService.getUserMsgService($scope);
//         }
//         $scope.sendMsg = () => {
//             let sendMsgData = {
//                 from: localStorage.getItem('loginId'),
//                 to: localStorage.getItem('receiverId'),
//                 msg: $scope.msg
//             }
//             console.log('sendmsg data=>', sendMsgData);
//             SocketService.emit('newMsg', sendMsgData);
//             $scope.msgData.push(sendMsgData);
//         }
//         var senderId = localStorage.getItem('loginId');
//         SocketService.on(senderId, (message) => {
//             console.log('msg emitted from server=>', message);
//             if (localStorage.getItem('receiverId') == message.to) {
//                 if ($scope.msgData == undefined) $scope.msgData = message
//                 else $scope.msgData.push(message), console.log('msgdata in scope', $scope.msgData)
//             }

//         })
//         $scope.clearTextArea = () => {
//             console.log('in clear test area');
//             $scope.msg = '';
//         }
//         $scope.logout = () => {
//             $location.path('/login')
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })