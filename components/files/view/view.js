/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function FilesView() {
    var self = this;
    this.mesages = {};

    this.init = function() {  
        arikaim.component.loadProperties('storage>files.messages',function(params) { 
            self.messages = params.messages;
        }); 
          
        viewTypeButton.init(function(view) {  
            var path = breadcrumb.getCurrentPath();     
            arikaim.page.loadContent({
                id: 'view_content',           
                component: 'storage>files.view.items',
                params: { 
                    path: path,
                    view_type: view 
                }
            });           
        });

        arikaim.ui.toggleButton({
            selector: '.upload-file',
            groupSelector: '.files-buttons',
            action: function(element) {       
                arikaim.ui.toggle({
                    selector: '#file_details',
                    value: arikaim.ui.isActive(element)
                });               
                var path = breadcrumb.getCurrentPath();

                arikaim.page.loadContent({
                    id: 'file_details',           
                    component: 'storage>files.upload',
                    params: { path: path }
                }); 
            }
        });

        arikaim.ui.toggleButton({
            selector: '.create-directory',
            groupSelector: '.files-buttons',
            action: function(element) {  
                arikaim.ui.toggle({
                    selector: '#file_details',
                    value: arikaim.ui.isActive(element)
                });                     
                var path = breadcrumb.getCurrentPath();
                arikaim.page.loadContent({
                    id: 'file_details',           
                    component: 'storage>files.directory.create',
                    params: { path: path }
                }); 
            }
        });     
    };

    this.openDirectory = function(path, trash) {           
        breadcrumb.setPath(path);
        trash = getDefaultValue(trash,false);
    
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'storage>files.view.items',
            params: { 
                path: path,
                trash: trash               
            }
        }); 
    };

    this.initRows = function() { 
        $('.file-link-button').popup({
            on: 'click'
        });        
        $('.file-actions').dropdown({});
    
        arikaim.ui.button('.delete-file',function(element) {
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

        arikaim.ui.button('.delete-directory',function(element) {
            var path = $(element).attr('path'); 
            var uuid = $(element).attr('uuid');         
            var title = self.messages.delete.title;
            var description = self.messages.delete.description;
            description = arikaim.ui.template.render(description,{ file_name: path });
            
            return modal.confirmDelete({ 
                title: title,
                description: description 
            },function() {                   
                files.deleteDirectory(path,uuid,function(result) {
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
            arikaim.ui.show('#file_details');               

            return arikaim.page.loadContent({
                id: 'file_details',           
                component: 'storage>files.share',
                params: { 
                    uuid: uuid,
                    path: path 
                }
            });  
        });
        
        arikaim.ui.button('.open-directory',function(element) {
            var path = $(element).attr('path');
            var trash = $(element).attr('trash');
           
            return self.openDirectory(path,trash);                    
        });    
    };
}

var filesView = new FilesView();

arikaim.page.onReady(function() {
    filesView.init();
    filesView.initRows();
});