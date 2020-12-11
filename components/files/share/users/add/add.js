'use strict';

$(document).ready(function() {

    arikaim.ui.form.addRules("#share_user_form",{
        inline: false,
        fields: {
            username: {
                identifier: "user_name",      
                rules: [{
                    type: "minLength[1]"       
                }]
            }
        }
    });   

    arikaim.ui.form.onSubmit('#share_user_form',function() {
        var fileId = $('.add-user-button').attr('file-id');
        var userName = $('#user_name').val();
        arikaim.ui.form.clear('#share_user_form');

        return files.addUserPermission(userName,fileId,'user','full','file',function(result) {
            $('.empty-row').remove();

            return arikaim.page.loadContent({
                id: 'permissions_rows',
                params: { 
                    uuid: result.uuid,
                },
                append: true,
                component: 'files>files.share.users.view.rows.row'
            },function(result) {                  
                filePermissions.initRows();
            });    
        },function(error) {           
            arikaim.page.toastMessage({
                class: 'error',
                message: error
            });             
        });       
    },function(result) {       
        arikaim.ui.form.showMessage(result.message);       
    },function(error) {       
        arikaim.ui.form.showMessage({
            message: error,
            class: 'error'
        });       
    });     
});