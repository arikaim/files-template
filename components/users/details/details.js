'use strict';

$(document).ready(function() {
    arikaim.ui.form.addRules("#user_details_form",{
        inline: false,        
        fields: {
            user_name: {
                indentifier: 'user_name', 
                rules: [
                    { type: 'minLength[2]' },
                    { type: 'htmlTags' }
                ]
            },
            email: {
                indentifier: 'email', 
                rules: [{ type: 'email' }]
            }
        }
    });      
    
    arikaim.ui.form.onSubmit('#user_details_form',function() {
       return users.changeDetails('#user_details_form');
    },function(result) {        
        arikaim.ui.form.showMessage({           
            message: result.message
        });
    },function(error) {        
    });
});