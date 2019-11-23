/**
 * @desc operation starts when controller is invoked
 * @param loginCtrl, ,invokes when the login is successfull 
 * @param registerCtrl, ,invokes when the register is invoked
 * @param forgotPasaswordCtrl, ,invokes when the forgot password is invoked
 * @param resetPasswordCtrl, ,invokes when the the url link in invoked.   
 * @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
 */

// Controllers for each of the APIs
app.controller("loginCtrl", function ($scope, services) {
    $scope.login = () => {
        console.log('in login ctrl');

        var data = {
            "email": $scope.email,
            "password": $scope.password
        }
        console.log("data", data);
        services.login(data, $scope);
    }
});



app.controller("registrationCntr", function ($scope, $location, services) {

    $scope.register = () => {
        var data = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "email": $scope.email,
            "password": $scope.password
        }
        services.register(data, $scope);
    }
    // redirecting to the login page after a successfull login
    $scope.pageChange = () => {
        $location.path("/#!/login");
    }
});



app.controller("forgotPasswordCtrl", function ($scope, services) {

    $scope.forgotPassword = () => {
        var data = {
            "email": $scope.email
        }
        services.forgotPassword(data, $scope);
    }
});



app.controller("resetPasswordCtrl", function ($scope, services, $location) {
    //Checks if the token is present
    console.log('TokenController');

    if ($location.url().indexOf('token') !== -1) {
        $scope.token = $location.url().split('=')[1];
        console.log("Token :", window.location.href())
    }

    $scope.resetPassword = () => {
        if ($scope.password == null || $scope.confirmPassword == null) {
            $scope.result = "password cant be empty";
        } else {
            var data = {
                "password": $scope.password,
                "confirmPassword": $scope.confirmPassword
            }
            services.resetPassword(data, $scope);
        }
    }
});

app.controller('chatCtrl', ($scope, services) => {
    try {
        services.getUsers($scope)
    } catch (e) {
        console.log(e);

    }
})