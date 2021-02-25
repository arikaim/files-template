/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function FilePermissionsView() {
    var self = this;
    this.messages = null;

    this.init = function() {
        paginator.init('permissions_rows');  
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('files:files.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }
    };

    this.initRows = function() { 

        arikaim.ui.button('.delete-permission',function(element) {       
            var title = self.messages.user_permission.title;
            var description = self.messages.user_permission.description;
            var uuid = $(element).attr('uuid');

            return modal.confirmDelete({ 
                title: title,
                description: description 
            },function() {         
                files.deletePermission(uuid,function(result) {
                    arikaim.ui.table.removeRow('#row_' + result.uuid);
                    arikaim.page.toastMessage(result.message);
                },function(error) {
                    arikaim.page.toastMessage({
                        class: 'error',
                        message: error
                    });
                });
            });        
        });
    };
}

var filePermissions = new FilePermissionsView();

arikaim.component.onLoaded(function() {
    filePermissions.init();
    filePermissions.initRows();
});