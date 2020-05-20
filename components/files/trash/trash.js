/**
 *  Arikaim  
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function TrashView() {
    var self = this;  
    this.mesages = {};

    this.init = function() {
        arikaim.component.loadProperties('storage>files.messages',function(params) { 
            self.messages = params.messages;
        });
      
        breadcrumb.init({
            onSelect: function(path) {
                self.loadTrashItems(path);                
            }           
        });

        viewTypeButton.init(function(view) {  
            var path = breadcrumb.getCurrentPath(); 
            return self.loadTrashItems(path);                   
        });

        arikaim.ui.button('.empty-trash',function(element) {       
            return modal.confirmDelete({ 
                title: self.messages.empty.title,
                description: self.messages.empty.description 
            },function() {         
                files.emtyTrash(function(result) {
                    $('#view_content').html('..');
                },function(error) {                   
                });
            });               
        });
    
        arikaim.ui.button('.restore-trash',function(element) {   
            files.restoreTrash(function(result) {
                $('.trash-button').addClass('disabled');
                $('#view_content').html('..');
                arikaim.page.toastMessage(result.message);
            },function(error) {
                arikaim.ui.toastMessage({
                    class: 'error',
                    message: result.message
                });
            });
        });
    };

    this.initRows = function() { 
        $('.file-actions').dropdown({});

        arikaim.ui.button('.restore-file',function(element) {   
            var path = $(element).attr('path');
        
            files.restore(path,function(result) {
                arikaim.ui.table.removeRow('#row_' + result.uuid,null,function(element) {
                    $('.trash-button').addClass('disabled');
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

    this.loadTrashItems = function(path) {
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'storage>files.view.items',
            params: { 
                path: path,
                trash: true               
            }
        });
    }
}

var trashView = new TrashView();

$(document).ready(function() {
    trashView.init();
});
