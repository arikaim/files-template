'use strict';

$(document).ready(function() { 
    arikaim.ui.form.onSubmit('#signup_form',function() {
        return users.signup('#signup_form');
    },function(result) {             
        arikaim.page.loadContent({
            id: 'signup_content',
            component: 'users>users.signup.message',
            params: { uuid: result.uuid }
        });  
    });
});