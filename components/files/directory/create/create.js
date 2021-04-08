'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.onSubmit("#create_directory_form",function() {
        if (isEmpty(breadcrumb) == false) {           
            $('#path').val(breadcrumb.getCurrentPath());
        }
        return files.createDirectory('#create_directory_form');       
    },function(result) {
        arikaim.page.toastMessage(result.message);
        arikaim.ui.form.clear('#create_directory_form');

        filesView.openDirectory(result.path);       
    });
});
