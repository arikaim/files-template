'use strict';

$(document).ready(function() {
    arikaim.ui.form.onSubmit('#user_details_form',function() {
       return users.changeDetails('#user_details_form');
    },function(result) {       
        arikaim.ui.form.showMessage({           
            message: result.message
        });
    },function(error) {
    });
});