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

        breadcrumb.init({
            onSelect: function(path) {                   
                self.openDirectory(path.substring(1));            
            },
            disableLinks: true
        });

        search.init({
            id: 'files_items',
            component: 'files:files.shared.items',
            event: 'files.search.load',
            beforeLoadResult: function(search) {
                search.options.params = {
                    path: breadcrumb.getPath(),
                    folder_id: $('#folder_id').val()
                };
            }
        },'files');  

        viewTypeButton.init(function(view) {             
            arikaim.page.loadContent({
                id: 'files_items',           
                component: 'files:files.shared.items',
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

    this.openDirectory = function(path,folderId) { 
        path = getDefaultValue(path,'');
        breadcrumb.setPath(path);    
        $('#search_path').val(path);
        $('#folder_id').val(folderId);

        paginator.setParams({
            path: path,
            folder_id: folderId
        });

        return arikaim.page.loadContent({
            id: 'files_items',           
            component: 'files:files.shared.items',
            params: { 
                path: path,
                folder_id: folderId                                      
            }
        },function(result) {
            paginator.reload();
        }); 
    };

    this.initRows = function() {  
        $('.file-actions').dropdown({}); 
       
        arikaim.ui.button('.open-directory',function(element) {
            var path = $(element).attr('path');
            var folderId = $(element).attr('folder-id');
         
            return self.openDirectory(path,folderId);
        });

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
                component: 'files:files.file.preview',
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
            $('#file_details_content').fadeIn(600);
          
            return arikaim.page.loadContent({
                id: 'file_details_content',           
                component: 'files:files.file.details',
                hideLoader: true,
                params: { 
                    uuid: uuid,
                    on_close: 'hide'                  
                }
            });                             
        });
    };
}

var sharedFiles = new SharedFiles();

arikaim.component.onLoaded(function() {
    sharedFiles.init();
    sharedFiles.initRows();
});
