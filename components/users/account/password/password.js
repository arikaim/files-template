'use strict';

$(document).ready(function() {
    arikaim.ui.form.addRules("#change_password_form",{
        inline: false,
        fields: {
            password: {
                rules: [{ type: "minLength[4]" }]
            },          
            repeat_password: {              
                rules: [
                    { type: "minLength[4]" },
                    { type: "match[password]" }
                ]
            }
        }
    });
    
    arikaim.ui.form.onSubmit('#change_password_form',function() {    
       return users.changeProfilePassword('#change_password_form');
    },function(result) {
        arikaim.ui.form.showMessage(result.message);
    });
});