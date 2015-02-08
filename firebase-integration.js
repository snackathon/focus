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
            window.user = authData;
        }

    }

    
    this.fb.onAuth(onAuthChange);
    
    this.publishActivity = function(user_id, activity_title, activity_desc) {
    var ref = new Firebase("https://radiant-torch-4176.firebaseio.com/activities/" + user_id);
    ref.push({
        title: activity_title,
        description: activity_desc
    });
};

    /*
this.activityRef = new Firebase("https://radiant-torch-4176.firebaseio.com/activities/");
                                       
        this.activityRef.on('child_added', function(newChild, oldChild) {
            console.log(newChild);
            toastr.info(newChild.title);
        });
        
        */

};
