'use strict';

$(document).ready(function() {
    var fileUpload = new FileUpload('#file_form',{
        url: '/api/storage/upload',
        maxFiles: 1,
        allowMultiple: true,
        acceptedFileTypes: [],
        formFields: {            
            note: '#note',
            path: '#path'
        },
        onStart: function(file) {
            if (isEmpty(breadcrumb) == false) {           
                $('#path').val(breadcrumb.getCurrentPath());
            }          
        },
        onSuccess: function(result) {
            arikaim.ui.form.clear('#file_form');          
            fileUpload.reset();
             
            return arikaim.page.loadContent({
                id: 'files_content',
                component: 'storage>files.view',
                params: { path: result.path },                
            });
        }
    });   
});