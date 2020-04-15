'use strict';

$(document).ready(function() {
    arikaim.ui.viewPasswordButton('.view-password');
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
});