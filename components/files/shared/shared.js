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

        viewTypeButton.init(function(view) {             
            arikaim.page.loadContent({
                id: 'files_items',           
                component: 'files>files.shared.items',
                params: {                 
                    view_type: view 
                }
            });           
        });          
    };

    this.openPasswordModal = function(uuid, fileName) {
        $('#uuid').val(uuid);
        $('#file_name').val(fileName);

        arikaim.ui.form.clear('#file_download_form');
        
        $('#file_password_modal').modal({
            centered: true,
            onVisible: function() {                 
            }
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
            $('#preview_file_content').html("");

            $('#preview_file').modal({
                centered: true,
                onVisible: function() {
                    arikaim.page.loadContent({
                        id: 'preview_file_content',           
                        component: 'files>files.file.preview',
                        params: { 
                            uuid: uuid
                        }
                    });
                },
                onHide: function() {
                    $('#preview_file_content').html("");
                }   
            }).modal('show');                         
        });
    };
}

var sharedFiles = new SharedFiles();

$(document).ready(function() {
    sharedFiles.init();
    sharedFiles.initRows();
});
