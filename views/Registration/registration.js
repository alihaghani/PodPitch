var rp = require('request-promise');

$(document).ready(function() {
    $('#register_button').click(function(event){
        event.preventDefault(); // prevents refresh
        var name = $('#name').val();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var conf_pass = $('#confirm_pass').val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(response) {
                //stuff
                console.log("we got here");
                var currentUser = firebase.auth().currentUser;
                console.log(currentUser.uid);
                var options = {
                    uri: 'localhost:3000/account/api/register',
                    body: {
                        name: name,
                        email: email,
                        id: currentUser.uid
                    }
                };
                return rp(options);
            }).then(function(res) {
                console.log(res);
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

        });
    });
});