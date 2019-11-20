app.service("chatService", function ($http, SocketService) {
    try {
        this.getUsers = function ($scope) {
            console.log("service in getAllUser");
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/getUsers'
            })
        }

        //to call getusermsg templates on the request

        this.getUserMsg = function ($scope) {
            try {
                let data = {
                    "from": $scope.userEmail,
                    "to": value.receiverEmail
                };
                localStorage.setItem('msgData', JSON.stringify(data));
                console.log("message details", data);
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/getMsg',
                    data: data
                });
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
                console.log("llo", loginDetails);
                console.log("email", $scope.userEmail);
                console.log("username:", $scope.userName);
            } catch (e) {
                console.log(e);
            }
        }
        this.logout = () => {
            localStorage.clear;
            $location.path('/')
        }
    } catch (e) {
        console.log(e);
    }
})