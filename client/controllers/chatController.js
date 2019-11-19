app.controller('controllerChat', function ($scope, chatService, SocketService) {
    try {
        chatService.getUserName($scope);
        chatService.getUsers($scope);

        /**
         * @description:to validate and the pass the controller to service
         * @param:$scope,chatService,socketService
         */

        $scope.storeMsg = () => {
            try {
                console.log("store message controller");
                let Allmsg = JSON.parse(localStorage.getItem('msgData'));
                console.log("all messaages", Allmsg);
                var data = {
                    "from": $scope.userEmail,
                    "to": Allmsg.to,
                    "message": $scope.msg
                }
                //emiting the socket event
                SocketService.emit("storemsg", data);
                //catching the emited socket event
                SocketService.on("updatedata", (data) => {
                    $scope.msg.push(data)
                })
            } catch (e) {
                console.log(e);
            }
        }
        //:to validate and the pass the controller to service



        $scope.person = (value) => {
            try {
                $scope.value = value;
                console.log("scope value: ", $scope.value);
                chatService.getUserMsg($scope, value);
            } catch (e) {
                console.log(e);
            }
        }
    } catch (e) {
        console.log(e);
    }
});