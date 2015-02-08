window.oneThing = function(notifier){
    this.fb = new Firebase("https://radiant-torch-4176.firebaseio.com/");
    this.usersRef = new Firebase("https://radiant-torch-4176.firebaseio.com/users/");
    this.uid = null;
    
    this.registerUser = function(email, password, success, fail) {
        var ref = this.usersRef;
                               
        ref.createUser({
            email: email,
            password: password
        }, function(error) {
            if (error === null) {
                //success
                success(email, password);
            }
            
            else {
                fail(error);
            }
        });
    };
    
    this.loginUser = function(email, password, success, fail) {
        var ref = this.usersRef;
        ref.authWithPassword({
            email: email,
            password: password
        },function(error, authData){
            if (error) {
                fail(error);
            }
            
            else {
                success(authData);
                console.log(authData);
            }
        });
    };
    
    function onAuthChange(authData) {
        if(authData) {
            console.log(authData);
            this.uid = authData.uid;
        }

    }

    
    this.fb.onAuth(onAuthChange);
    
    this.publishActivity(user_id, activity_title, activity_desc) {
    var ref = new Firebase("https://radiant-torch-4176.firebaseio.com/activities/" + user_id);
    ref.push({
        title: activity_title,
        description: activity_desc
    });
};

};



(function(){
    
    var toastOptions = {
        "positionClass": "toast-top-full-width"
    };
    
     function onFirebaseFail(error) {
        console.log(error);
        
        toastr.info(error.message, null, toastOptions);
    };
    
    function onLoginSuccess() {
        toastr.success("You're logged in, welcome", null, toastOptions);
    }
    
    function successToast(message) {
        toastr.success(message, null, toastOptions);
    }
    

    
    var thing = new oneThing(window.toastr);
    /*
    thing.registerUser("nathan.f1234+3@gmail.com", "testing123",
    function(email, password){
        successToast("You've signed up successfully");
        thing.loginUser(email, password, onLoginSuccess, onFirebaseFail);
    },onFirebaseFail);
    */
    
    thing.loginUser("nathan.f1234@gmail.com", "testing123", onLoginSuccess, onFirebaseFail);
    thing.publish
        

    
    
})();