var app = angular.module("myApp", ["ngRoute", 'btford.socket-io']);

//Routing paths
app.config(function ($routeProvider) {
    console.log("in routeprovider")

    $routeProvider
        .when('/', {
            templateUrl: "./views/login.html",
            controller: "loginCtrl"
        })
        .when('/register', {
            templateUrl: "./views/register.html",
            controller: "registrationCntr"

        })
        .when('/forgotPassword', {
            templateUrl: "./views/forgotPassword.html",
            controller: "forgotPasswordCtrl"

        })
        .when('/resetPassword/:token', {
            templateUrl: "./views/resetPassword.html",
            controller: "resetPasswordCtrl"

        })
        .when('/dashBoard', {
            templateUrl: "./views/dashBoard.html",
            controller: 'controllerChat'

        })

        .otherwise({
            redirectTo: "/"
        });
});

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]);