'use strict';

$(document).ready(function() { 
    arikaim.ui.viewPasswordButton('.view-password');

    arikaim.ui.form.onSubmit('#filesystem_config_form',function() {
        return filesystemsApi.saveConfig('#filesystem_config_form');
    },function(result) {      
        // set status to pending
        filesystemsApi.setStatus(result.uuid,4); 
        arikaim.ui.form.showMessage(result.message);   
        filesystemsView.loadConfig(result.driver_name);       
    }); 
});