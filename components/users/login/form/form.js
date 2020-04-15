'use strict';

$(document).ready(function() {
    arikaim.ui.viewPasswordButton('.view-password','#password');

    arikaim.ui.form.addRules("#login_form",{
        inline: false,
        fields: {
            password: {
                rules: [{ type: "minLength[4]" }]
            },
            user_name: {
                rules: [{ type: "empty" }]
            }
        }
    });   
});