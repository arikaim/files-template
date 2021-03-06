/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function FilesView() {
    var self = this;
    this.messages = null;

    this.init = function() {  
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('files:files.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }
        
        breadcrumb.init({
            onSelect: function(path) {  
                filesView.openDirectory(path);            
            },
            separatorClass: 'p-2',
            pathItemClass: 'p-2 cursor-pointer text-gray-800 hover:text-red-500 transition duration-1000 ease-in-out'
        });

        paginator.init('view_content');   

        viewTypeButton.init(function(view) {  
            var path = breadcrumb.getCurrentPath();   
            self.openDirectory(path);                  
        });

        $('.filesystem-dropdown').dropdown({
            onChange: function(value) {               
                filesView.openDirectory('',value);               
            }
        });

        arikaim.ui.button('.upload-file',function(element) {
            $('#file_details').show();                  
            var path = breadcrumb.getCurrentPath();
            var driverName = $('#filesystem_dropdown').dropdown('get value');

            arikaim.page.loadContent({
                id: 'file_details',           
                component: 'files:files.upload',
                params: { 
                    path: path, 
                    filesystem: driverName
                }
            });           
        });

        arikaim.ui.button('.create-directory',function(element) {
            $('#file_details').show();                    
            var path = breadcrumb.getCurrentPath();
            var driverName = $('#filesystem_dropdown').dropdown('get value');

            arikaim.page.loadContent({
                id: 'file_details',           
                component: 'files:files.directory.create',
                params: { 
                    path: path, 
                    filesystem: driverName 
                }
            });            
        });     
    };

    this.loadEmpty = function() {
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'files:files.view.items.empty'
        });
    };

    this.openDirectory = function(path, driverName) {           
        breadcrumb.setPath(path);
        if (isEmpty(driverName) == true) {
            driverName = $('#filesystem_dropdown').dropdown('get value');
        }

        $('#file_details').hide();
        $('#file_details').html('');                  
        arikaim.ui.setButtonGroupInactive('.files-buttons'); 
       
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'files:files.view.items',
            params: { 
                path: path,
                driver_name: driverName            
            }
        },function(result) {         
            self.initRows();
        }); 
    };

    this.initRows = function() {              
        $('.preview-image').off();
        $('.preview-image').on('load',function() {
            var uuid = $(this).attr('uuid');
            $('#image_loader_' + uuid).remove();
        });

        arikaim.ui.button('.preview-file',function(element) {
            var uuid = $(element).attr('uuid');
            $('#preview_file_content').html('');

            arikaim.page.loadContent({
                id: 'preview_file_content',           
                component: 'files:files.file.preview',
                params: { 
                    uuid: uuid
                }
            },function(result) {              
                $('#preview_file').modal({
                    centered: true,               
                    onHide: function() {                        
                        $('#preview_file_content').html('');
                    }   
                }).modal('show');  
            });                                 
        });

        arikaim.ui.button('.move-trash-file',function(element) {
            var path = $(element).attr('path');
            var fileName = $(element).attr('name');
            var title = self.messages.move.title;
            var description = self.messages.move.description;
           
            description = arikaim.ui.template.render(description,{ file_name: fileName });
            return modal.confirmDelete({ 
                title: title,
                description: description 
            },function() {         
                files.moveToTrash(path,fileName,function(result) {
                    arikaim.page.toastMessage(result.message);
                    arikaim.ui.table.removeRow('#row_' + result.uuid,null,function() {
                        self.loadEmpty();
                    });                  
                },function(error) {
                    arikaim.page.toastMessage({
                        class: 'error',
                        message: error
                    });
                });
            });        
        });

        arikaim.ui.button('.delete-file',function(element) {
            var path = $(element).attr('path');
            var fileName = $(element).attr('name');
            var filesystem = $('#filesystem_dropdown').dropdown('get value');
            var title = self.messages.delete.title;
            var description = self.messages.delete.description;
           
            description = arikaim.ui.template.render(description,{ file_name: fileName });
            return modal.confirmDelete({ 
                title: title,
                description: description 
            },function() {         
                files.delete(path,fileName,filesystem,function(result) {
                    arikaim.page.toastMessage(result.message);
                    arikaim.ui.table.removeRow('#row_' + result.uuid,null,function() {
                        self.loadEmpty();
                    });                   
                },function(error) {
                    arikaim.page.toastMessage({
                        class: 'error',                       
                        message: error
                    });
                });
            });        
        });

        arikaim.ui.button('.delete-directory',function(element) {
            var path = $(element).attr('path');    
            var filesystem = $('#filesystem_dropdown').dropdown('get value');         
            var title = self.messages.delete.title;
            var description = self.messages.delete.description;
            description = arikaim.ui.template.render(description,{ file_name: path });
            
            return modal.confirmDelete({ 
                title: title,
                description: description 
            },function() {                   
                files.deleteDirectory(path,filesystem,function(result) {
                    arikaim.ui.table.removeRow('#row_'+ result.uuid);
                    arikaim.page.toastMessage(result.message);
                },function(error) {
                    arikaim.page.toastMessage({
                        class: 'error',
                        message: error
                    });
                });
            });        
        });

        arikaim.ui.button('.share-file',function(element) {
            var uuid = $(element).attr('uuid');
            var path = $(element).attr('path');
            var driverName = $('#filesystem_dropdown').dropdown('get value');
            arikaim.ui.show('#file_details');               

            return arikaim.page.loadContent({
                id: 'file_details',           
                component: 'files:files.share',
                params: { 
                    uuid: uuid,
                    filesystem: driverName,
                    path: path 
                }
            });  
        });
        
        arikaim.ui.button('.open-directory',function(element) {
            var path = $(element).attr('path');
           
            return self.openDirectory(path);                    
        });   
        
        arikaim.ui.button('.file-details',function(element) {
            var uuid = $(element).attr('uuid');  
            $('#file_details_content').fadeIn(600);

            return arikaim.page.loadContent({
                id: 'file_details_content',           
                component: 'files:files.file.details',
                hideLoader: true,
                params: { 
                    uuid: uuid                  
                }
            });                             
        });
    };
}

var filesView = new FilesView();

arikaim.component.onLoaded(function() {
    filesView.init();
    filesView.initRows();
});