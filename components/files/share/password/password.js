'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.viewPasswordButton('.view-password','#file_password');

    arikaim.ui.button('.remove-password',function(element) {        
        $('#file_password').val("");
        $('#file_password_form').submit();
    });

    arikaim.ui.form.onSubmit('#file_password_form',function() {
        return files.updatePassword('#file_password_form');
    },function(result) {       
        arikaim.ui.form.showMessage(result.message);       
    }); 
});