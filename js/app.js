
(function(){
    var app = angular.module('app', []);

    var toastOptions = {
        "positionClass": "toast-top-full-width"
    };
    
     function onFirebaseFail(error) {
        console.log(error);
        
        toastr.info(error.message, null, toastOptions);
    };
    
    function onLoginSuccess(user) {
        toastr.success("You're logged in, welcome", null, toastOptions);
        $rootScope.user.loggedIn = true;
        window.user = user;
    }
    
    function successToast(message) {
        toastr.success(message, null, toastOptions);
    }
    

    
    var thing = new oneThing(window.toastr);
    
    app.controller('mainController', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    $scope.hasOpenTask = false;
        
    $scope.loginUser = function() {
        thing.loginUser($scope.user.email, $scope.user.password, onLoginSuccess, onFirebaseFail);
    }
    
    $scope.createTask = function() {
        thing.publishActivity(window.user.auth.uid, $scope.taskTitle, "");
        $scope.hasOpenTask = true;
    }
    
    window.displayProgress = function() {
        $scope.hasOpenTask = true;
    };
}]);
    
        

    
    
})();