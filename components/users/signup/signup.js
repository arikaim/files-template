'use strict';

$(document).ready(function() { 
    arikaim.ui.form.addRules("#signup_form",{
        inline: false,
        fields: {
            user_name: {
                identifier: 'user_name',
                rules: [{ type:'minLength[2]' }]
            },
            email: {
                identifier: 'email',
                rules: [{ type: 'email' }]
            },
            password: {
                identifier: 'password',
                rules: [{ type: "minLength[4]" }]
            },
            repeat_password: {
                identifier: 'repeat_password',
                rules: [
                    { type: "minLength[4]" },
                    { type: "match[password]" }
                ]
            }
        }
    }); 

    arikaim.ui.form.onSubmit('#signup_form',function() {
        return users.signup('#signup_form');
    },function(result) {             
        arikaim.page.loadContent({
            id: 'signup_content',
            component: 'files>users.signup.message',
            params: { uuid: result.uuid }
        });  
    });
});