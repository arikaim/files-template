/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function FilesystemsView() {
    var self = this;
    this.messages = null;

    this.init = function() {
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('files:files.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }

        $('.filesystems-list').accordion({
            onOpen: function() {
                var driverName = $(this).attr('driver-name');
                self.loadConfig(driverName);
            },
            onClose: function() {
                $(this).html('');
            }
        });
    };

    this.loadConfig = function(driverName) {
        return arikaim.page.loadContent({
            id: 'driver_config_' + driverName,           
            component: 'files:users.account.filesystems.config',
            params: { 
                driver_name: driverName                              
            }
        },function(result) {          
        }); 
    };

    this.loadEditConfig = function(driverName) {
        return arikaim.page.loadContent({
            id: 'driver_config_' + driverName,           
            component: 'files:users.account.filesystems.edit',
            params: { 
                driver_name: driverName                              
            }
        },function(result) {          
        }); 
    };

    this.initRows = function() { 
        arikaim.ui.button('.view-config-button',function(element) {
            var driverName = $(element).attr('driver-name');         
            var state = $(element).state('is active');
           
            if (state != true) {
                self.loadConfig(driverName);
                $(element).state('toggle');
                return;
            } 
            $('#' + 'driver_config_' + driverName).html('');
            $(element).state('toggle');
        });

        arikaim.ui.button('.edit-config-button',function(element) {
            var driverName = $(element).attr('driver-name');
         
            return self.loadEditConfig(driverName);
        });

        arikaim.ui.button('.check-connection-button',function(element) {
            var driverName = $(element).attr('driver-name');
            var uuid = $(element).attr('uuid');

            $(element).removeClass('red');
            return filesystemsApi.checkConnection(driverName, function(result) {
                arikaim.page.toastMessage(result.message);                                   
                $('.check-connection-button').hide();
                $('.success-status').removeClass('hidden');

                filesystemsApi.setStatus(result.uuid,1);
            },function(error) {
                arikaim.page.toastMessage({
                    class: 'error',
                    message: error
                });
                $(element).addClass('red');
                $(element).attr('title',error);
                filesystemsApi.setStatus(uuid,6); // set error status             
            });            
        });

        arikaim.ui.button('.delete-config',function(element) {
            var driverName = $(element).attr('driver-name');
            var title = self.messages.connection_delete.title;
            var description = self.messages.connection_delete.description;
           
            description = arikaim.ui.template.render(description,{ driver_name: driverName });
            return modal.confirmDelete({ 
                title: title,
                description: description 
            },function() {                 
                return filesystemsApi.delete(driverName,function(result) {                
                    $('#' + 'driver_config_' + driverName).html('');
                    $('.filesystems-list').accordion('refresh');
                }); 
            });
        });

        arikaim.ui.button('.create-config',function(element) {
            var driverName = $(element).attr('driver-name');
            
            return filesystemsApi.add(driverName,function(result) {
                self.loadEditConfig(driverName);
            }); 
        });
    };
}

var filesystemsView = new FilesystemsView();

arikaim.component.onLoaded(function() {
    filesystemsView.init(); 
    filesystemsView.initRows();
});
