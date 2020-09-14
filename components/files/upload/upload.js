'use strict';

$(document).ready(function() {

    arikaim.ui.button('.close-button',function(element) {              
        $('.upload-file').click();      
    });

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
            arikaim.page.toastMessage(result.message);
            arikaim.ui.form.clear('#file_form');          
            fileUpload.reset();
             
            return arikaim.page.loadContent({
                id: 'files_content',
                component: 'files>files.view',
                params: { path: result.path },                
            });
        }
    });   
});