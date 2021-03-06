/**
 *  Arikaim  
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function TrashView() {
    var self = this;  
    this.mesages = null;

    this.init = function() {
        if (isObject(this.mesages) == false) {
            arikaim.component.loadProperties('files:files.messages',function(params) { 
                self.messages = params.messages;
            });
        }
      
        breadcrumb.init({
            onSelect: function(path) {
                self.loadTrashItems(path);                
            },
            separatorClass: 'p-2',
            pathItemClass: 'p-2 cursor-pointer text-gray-800 hover:text-red-500 transition duration-1000 ease-in-out'           
        });

        arikaim.ui.button('.empty-trash',function(element) {       
            return modal.confirmDelete({ 
                title: self.messages.empty.title,
                description: self.messages.empty.description 
            },function() {         
                files.emtyTrash(function(result) {
                    self.loadEmpty();
                });
            });               
        });
    
        arikaim.ui.button('.restore-trash',function(element) {   
            files.restoreTrash(function(result) {
                $('.trash-button').addClass('disabled');
                self.loadEmpty();
                arikaim.page.toastMessage(result.message);
            },function(error) {
                arikaim.page.toastMessage({
                    class: 'error',
                    message: error
                });
            });
        });
    };

    this.loadEmpty = function() {
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'files:files.view.items.empty'
        });
    };

    this.initRows = function() { 
        $('.file-actions').dropdown({});

        arikaim.ui.button('.restore-file',function(element) {   
            var path = $(element).attr('path');
            var uuid = $(element).attr('uuid');

            files.restore(path,function(result) {
                arikaim.ui.table.removeRow('#row_' + uuid,null,function(element) {
                    $('.trash-button').addClass('disabled');
                    self.loadEmpty();
                });
                arikaim.page.toastMessage(result.message);                   
            },function(error) {
                arikaim.page.toastMessage({
                    class: 'error',
                    message: error
                });
            });
        });
        
        arikaim.ui.button('.open-directory',function(element) {
            var path = $(element).attr('path');
            breadcrumb.setPath(path);
            return self.loadTrashItems(path);               
        }); 
    };

    this.loadTrashItems = function(path,viewType) {
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'files:files.trash.rows',
            params: { 
                path: path,                  
                view_type: viewType                
            }
        });
    };
}

var trashView = new TrashView();

arikaim.component.onLoaded(function() {
    trashView.init();
});
