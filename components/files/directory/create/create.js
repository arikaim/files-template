'use strict';

$(document).ready(function() {
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
            component: 'storage>files.view.items',
            params: { path: result.path }
        });  
    });
});
