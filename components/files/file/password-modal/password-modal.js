'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.viewPasswordButton('.view-password','#password');

    arikaim.ui.button('#download_protected_file',function(element) {
        $('#file_download_form').submit();        
    });  
   
    arikaim.ui.form.onSubmit('#file_download_form',function() {
        var fileName = $('#file_name').val();
        return files.downloadProtetedFile(fileName,'file_download_form',function(result) {
            $('#file_password_modal').modal('hide');
        },function(error) {           
          
        });
    })
});