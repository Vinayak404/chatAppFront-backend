app.service('servicesLogin', function ($http, $location) {


    this.login = (data, $scope) => {
        try {
            //uses http to send request via json file havinf method, url and login data.
            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then(function sucessCallback(response) {
                    let user = response.data[0];
                    $location.path("/userDashbord");
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log("Login sucessfull", response);
                },
                function errrCallback(response) {
                    $scope.result = "Please check the login details";
                    console.log("Login failed", response);
                });
        } catch (e) {
            console.log(e);
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
            }, function errrCallback(response) {
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
            }).catch(function errrCallback(response) {
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
            $http({
                method: 'POST',
                url: 'http://localhost:3000/resetpassword' + $scope.token,
                data: data
            }).then(function sucessCallback(response) {
                    $scope.result = "Changes updated";
                    console.log("changes updated", response.status);
                },
                function errrCallback(response) {
                    if ($scope.Password == null && $scope.confirmPassword == null)
                        $scope.result = response.data.error[0].msg;
                    else
                        $scope.result = "passwords dont match";
                    console.log("reset failed", response);
                });
        } catch (e) {
            console.log(e);
        }
    }

});