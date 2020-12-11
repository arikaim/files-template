/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function SharedFiles() {
    var self = this;

    this.init = function() {    
        paginator.init('files_items');    

        search.init({
            id: 'files_items',
            component: 'files>files.shared.items',
            event: 'files.search.load'
        },'files')  

        viewTypeButton.init(function(view) {             
            arikaim.page.loadContent({
                id: 'files_items',           
                component: 'files>files.shared.items',
                params: {                 
                    view_type: view 
                }
            });           
        });        
        
        arikaim.events.on('files.search.load',function(result) {      
            paginator.reload();
            self.initRows();    
        },'filesSearch');     
    };

    this.openPasswordModal = function(uuid, fileName) {
        $('#uuid').val(uuid);
        $('#file_name').val(fileName);

        arikaim.ui.form.clear('#file_download_form');
        
        $('#file_password_modal').modal({
            centered: true
        }).modal('show');
    };

    this.initRows = function() { 
        $('.show-popup').popup({});
        $('.file-link-button').popup({
            on: 'click'
        });
        
        $('.file-actions').dropdown({}); 
        
        arikaim.ui.button('.show-password-modal',function(element) {
            var uuid = $(element).attr('uuid');
            var fileName = $(element).attr('file-name');
            
            return self.openPasswordModal(uuid,fileName);
        });

        arikaim.ui.button('.preview-file',function(element) {
            var uuid = $(element).attr('uuid');
            $('#preview_file_content').html('');

            arikaim.page.loadContent({
                id: 'preview_file_content',           
                component: 'files>files.file.preview',
                params: { 
                    uuid: uuid
                }
            },function(result) {
                $('#preview_file').modal({
                    onHide: function() {
                        $('#preview_file_content').html('');
                    } 
                }).modal('show');
            });                       
        });

        arikaim.ui.button('.file-details',function(element) {
            var uuid = $(element).attr('uuid');  
         
            var el = $('#file_details_content');
            if (el.html().trim() != '') {
                $(el).transition({
                    animation: 'fade left out',
                    reverse: false
                }); 
            }
            
            return arikaim.page.loadContent({
                id: 'file_details_content',           
                component: 'files>files.file.details',
                hideLoader: true,
                params: { 
                    uuid: uuid,
                    on_close: 'hide'                  
                }
            },function(result) {
                $('#file_details_content').transition({
                    animation: 'fade left in',
                    reverse: false
                });  
            });                             
        });
    };
}

var sharedFiles = new SharedFiles();

$(document).ready(function() {
    sharedFiles.init();
    sharedFiles.initRows();
});
