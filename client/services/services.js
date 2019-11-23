/**
 * @desc operation starts when services is invoked.
 * @param login, ,invokes when the login is called. 
 * @param register, ,invokes when the register is invoked
 * @param forgotPasasword, ,invokes when the forgot password is invoked
 * @param resetPassword, ,invokes when the the url link in invoked.   
 * @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
 */
app.service('services', function ($http, $location) {

    this.login = (data, $scope) => {
        try {
            //uses http to send request via json file havinf method, url and login data.
            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then((response) => {
                console.log('Response in login services', response);
                console.log("firstname", response.data.data.firstName);
                localStorage.setItem('firstName', response.data.data.firstName);
                localStorage.setItem('senderId', response.data.data._id);
                $location.path('/dashBoard')
            }).catch((response) => {
                $scope.result = "Please check the login details";
                console.log("Login failed", response);
            });
        } catch (e) {
            console.log("cfsdf", e);
        }
    }



    this.register = (data, $scope) => {
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: data
            }).then(function sucessCallback(response) {
                //path will direct the next path.
                $location.path("/login");
                console.log("Registeration successful", response);
            }, function errorCallback(response) {
                if ($scope.email != null)
                    $scope.result = response.data;
                else
                    $scope.result = response.data.error[0].msg;
                console.log("Registeration failed", response);
            });
        } catch (e) {
            console.log(e);
        }

    }

    this.forgotPassword = (data, $scope) => {
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/forgotPassword',
                data: data
            }).then(function sucessCallback(response) {
                $scope.result = "Verification link sent to mail "
                console.log("Verifiation successful", response);
            }).catch(function errorCallback(response) {
                if ($scope.email == null)
                    $scope.result = response.data.error[0].msg;
                else
                    $scope.result = "Email does not Exist";
                console.log("verification successful", response);
            });
        } catch (e) {
            console.log(e);
        }
    }




    this.resetPassword = (data, $scope) => {
        try {
            var url = window.location.href;
            console.log('at reset service');
            var token = url.split('/');
            var token1 = token[5]

            $http({
                method: 'POST',
                url: `http://localhost:3000/resetpassword/${token1}`,
                data: data
            }).then(function sucessCallback(response) {
                    $scope.result = "Changes updated";
                    console.log("changes updated", response.status);
                },
                function errorCallback(response) {
                    if ($scope.password == null && $scope.confirmPassword == null)
                        $scope.result = response.data.error[0].msg;
                    else
                        $scope.result = "passwords dont match";
                    console.log("reset failed", response);
                });
        } catch (e) {
            console.log(e);
        }
    }
    this.getUsers = ($scope) => {
        try {
            console.log(process.env.GETUSERSURL);

            $http({
                method: "GET",
                url: 'http://localhost:3000/dashBoard'
            }).then((data) => {
                $scope.result = "all users returned"
                console.log(data)
            }).catch((err) => {
                $scope.result = "request failed"
                console.log(err)
            })
        } catch (e) {
            console.log(e);
        }
    }

});