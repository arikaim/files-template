'use strict';

$(document).ready(function() {
    arikaim.ui.form.onSubmit('#change_password_form',function() {    
       return users.changeProfilePassword('#change_password_form');
    },function(result) {
        arikaim.ui.form.showMessage(result.message);
    });
});