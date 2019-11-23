app.service('getUserService', function ($http, $location) {

    this.getUserServiceData = function ($scope) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getUsers'
        }).then(function (response) {
            console.log("response in get Users server---", response)
            console.log("Resonse on sucess");
            if (response.data.success = true) {
                $scope.currUser = localStorage.getItem('firstName');
                $scope.currUserId = localStorage.getItem('loginId');
                $scope.userData = response.data;
                console.log("all user data-->", $scope.userData);
            } else {
                console.log(response);
                $location.path('/login');
            }
        }).catch(function (err) {
            $location.path('/login');
            alert('failed...');
        });
    }

    /**
     * get user message
     */

    this.getUserMsgService = function ($scope) {
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/getMessage',
        }).then(function (response) {
            $scope.receiverName = localStorage.getItem('receiverName')
            let msgArr = [];
            let senderId = localStorage.getItem('senderId');
            let receiverId = localStorage.getItem('receiverId');
            console.log("response in get nsg service-->", response.data);

            for (let i = 0; i < response.data.length; i++) {
                let list = response.data
                console.log("list-->", list);
                if ((senderId === list[i].from && receiverId === list[i].to) ||
                    senderId === list[i].to && receiverId === list[i].from) {
                    msgArr.push(list[i]);
                    // console.log("msgArr--",msgArr)
                }
                $scope.msgData = msgArr;
            }
            console.log("msgData---", $scope.msgData)
        }).catch((err) => {
            return err;
        })
    }



});



// /**
//  * @desc operation starts when chatServices is invoked
//  * @param chatService ,invokes when the login is successfull 
//  * @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
//  */
// app.service("chatService", function ($http, $location) {
//     try {

//         this.getUserServiceData = function ($scope) {
//             $http({
//                 method: 'GET',
//                 url: 'http://localhost:3000/getUsers'
//             }).then(function (response) {
//                 console.log("response in get Users server---", response.data)
//                 console.log("Resonse on sucess", response.success);
//                 $scope.currUser = localStorage.getItem('firstName');
//                 $scope.currUserId = localStorage.getItem('loginId');
//                 $scope.userData = response.data.result;
//                 console.log("scope .....", $scope.currUser, $scope.currUserId, $scope.userData)
//                 // if (response.data.success = true) {
//                 //     $scope.currUser = localStorage.getItem('firstName');
//                 //     $scope.currUserId = localStorage.getItem('loginId');
//                 //     $scope.userData = response.data.result;
//                 //     console.log("all user data-->", $scope.userData);
//                 // } else {
//                 //     console.log(response);
//                 //     $location.path('/login');
//                 // }
//             }).catch(function (err) {
//                 $location.path('/login');
//                 alert('failed...');
//             });
//         }

//         /**
//          * get user message
//          */

//         this.getUserMsgService = function ($scope) {
//             $http({
//                 method: 'GET',
//                 url: 'http://localhost:3000/getMsg'
//             }).then(function (response) {
//                 $scope.receiverName = localStorage.getItem('receiverName')
//                 let msgArr = [];
//                 let senderId = localStorage.getItem('loginId');
//                 let receiverId = localStorage.getItem('receiverId');
//                 console.log("response-->", response.data.result);
//                 for (let i = 0; i < response.data.result.length; i++) {
//                     let list = response.data.result[i];
//                     if ((senderId == list.from && receiverId == list.to) ||
//                         senderId == list.to && receiverId == list.from) {
//                         msgArr.push(list);
//                         // console.log("msgArr--",msgArr)
//                     }
//                     $scope.msgData = msgArr;
//                 }
//                 console.log("msgData---", $scope.msgData)
//             }).catch((err) => {
//                 return err;
//             })
//         }

//     } catch (e) {
//         console.log(e);

//     }
// });


//             })
//         }

//         //to call getusermsg templates on the request

//         this.getUserMsg = function ($scope) {
//             try {
//                 let data = {
//                     "from": $scope.userEmail,
//                     "to": $scope.receiverEmail
//                 };
//                 localStorage.setItem('msgData', JSON.stringify(data));
//                 console.log("message details", data);
//                 return $http({
//                     method: 'GET',
//                     url: 'http://localhost:3000/getMessage',
//                     data: data
//                 });
//             } catch (e) {
//                 console.log(e);
//             }
//         }

//         // to call getusername templates as on the request

//         this.getUserName = ($scope) => {
//             try {
//                 console.log("service  in getUsername");
//                 var loginDetails = JSON.parse(localStorage.getItem('user'));
//                 $scope.userEmail = loginDetails.email;
//                 $scope.userName = loginDetails.firstName;
//                 console.log("llo", loginDetails);
//                 console.log("email", $scope.userEmail);
//                 console.log("username:", $scope.userName);
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//         this.logout = () => {
//             localStorage.clear;
//             $location.path('/')
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })