'use strict';

arikaim.component.onLoaded(function() {
    $('.groups-dropdown').dropdown({});

    arikaim.ui.button('.add-group-permission',function(element) {
        var fileId = $(element).attr('file-id');
        var groupId = $('.groups-dropdown').dropdown("get value");
        
        return files.addUserPermission(groupId,fileId,'group','full','file',function(result) {
            return arikaim.page.loadContent({
                id: 'permissions_rows',
                params: { 
                    uuid: result.uuid,
                },
                append: true,
                component: 'files:files.share.groups.view.rows.row'
            },function(result) {                  
                filePermissions.initRows();
            });    
        },function(error) {           
            arikaim.page.toastMessage({
                class: 'error',
                message: error
            });             
        });       
    });
});