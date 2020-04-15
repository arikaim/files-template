'use strict';

$(document).ready(function() { 
    arikaim.ui.viewPasswordButton('.view-password');
    arikaim.ui.form.addRules("#user_details_form",{
        inline: false,
        fields: {
            user_name: {
                rules: [{ type: 'minLength[2]' }]
            },
            email: {
                rules: [{ type: 'email' }]
            }
        }
    });  
});