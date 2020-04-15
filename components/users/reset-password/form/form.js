'use strict';

$(document).ready(function () {
    arikaim.ui.form.addRules('#reset_password_form',{
        inline: false,
        fields: {
            email: {
                rules: [{ type: "email" }]
            }
        }
    });
 
    arikaim.ui.form.onSubmit('#reset_password_form',function() {   
        return users.resetPassword('#reset_password_form');
    },function(result) {     
        arikaim.ui.form.showMessage({
            selector: '#reset_password_form',
            message: result.message,
            hide: 0
        });
    });
});