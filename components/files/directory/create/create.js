'use strict';

$(document).ready(function() {
    
    arikaim.ui.button('.close-button',function(element) {              
        $('.create-directory').click();      
    });

    arikaim.ui.form.onSubmit("#create_directory_form",function() {
        if (isEmpty(breadcrumb) == false) {           
            $('#path').val(breadcrumb.getCurrentPath());
        }
        return files.createDirectory('#create_directory_form');       
    },function(result) {
        arikaim.page.toastMessage(result.message);
        arikaim.ui.form.clear('#create_directory_form');

        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'files>files.view.items',
            params: { path: result.path }
        });  
    });
});
