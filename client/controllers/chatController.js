 app.controller('controllerChat', function ($scope, chatService, SocketService) {
     try {

         $scope.userName = localStorage.getItem('user');
         console.log('in chat controller');

         chatService.getUserName($scope);
         chatService.getUsers().then(function successfulCallback(response) {
             $scope.allUsers = response.data.filter((friendsID) => {
                     return $scope.userName != friendsID
                 }),

                 function errorCallback(err) {
                     $scope.value = 'User not registered'
                     console.log(err);
                 }
         })

         //to validate and call service
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
         $scope.person = (receiverEmail) => {
             try {
                 $scope.receiverEmail = receiverEmail;
                 console.log("scope value: ", $scope.receiverEmail);
                 chatService.getUserMsg($scope).then(function (response) {
                     $scope.msgs = response.data;
                     SocketService.emit('updated in service', response.data)
                 }, function errorCallback(err) {
                     $scope.value = "not registered"
                     console.log('failed', err);
                 });
             } catch (e) {
                 console.log(e);
             }
         }
     } catch (e) {
         console.log(e);
     }
 });