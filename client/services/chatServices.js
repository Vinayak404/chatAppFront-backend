app.service("chatService", function ($http, SocketService) {
    try {
        /**
         * @description:to call getalluser templates as on the request
         * @param:$scope
         */

        this.getUsers = function ($scope) {
            console.log("service in getAllUser");
            $http({
                method: 'GET',
                url: 'http://localhost:3000/getUsers'
            }).then(function successCallBack(response) {
                    $scope.data = response.data;
                    //console.log("getAlluser data: ", $scope.data);
                    console.log("getUsers details", response);
                },
                function errorCallBack(error) {
                    $scope.value = "user register not done......";
                    console.log("Failed", error);
                }
            )
        }



        //to call getusermsg templates on the request



        this.getUserMsg = function ($scope, value) {
            try {
                //var current = JSON.parse(localStorage.getItem('currentUser'));
                //console.log(current);
                let data = {
                    "from": $scope.userEmail,
                    "to": value.email
                };
                localStorage.setItem('msgData', JSON.stringify(data));
                console.log("....................", data);
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/getMsg',
                    data: data
                }).then(function successCallBack(response) {
                        $scope.msg = response.data;
                        // console.log("getAllMessage data: ", $scope.msg);
                        SocketService.emit("updatesList in service:", response.data)
                        console.log("getUserMessage", response);
                    },
                    function errorCallBack(error) {
                        $scope.value = "no user register";
                        console.log("Failed", error);
                    }
                )
            } catch (e) {
                console.log(e);
            }
        }



        // to call getusername templates as on the request
        this.getUserName = ($scope) => {
            try {
                console.log("service  in getUsername");
                var loginDetails = JSON.parse(localStorage.getItem('user'));
                $scope.userEmail = loginDetails.email;
                $scope.userName = loginDetails.firstName;
                console.log(loginDetails);
                console.log("email ", $scope.userEmail);
                console.log("username: ", $scope.userName);
            } catch (e) {
                console.log(e);
            }
        }


    } catch (e) {
        console.log(e);
    }
})