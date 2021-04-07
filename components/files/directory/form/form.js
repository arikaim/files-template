'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules("#create_directory_form",{});   

    arikaim.ui.button('.cancel-button',function(element) {
        arikaim.ui.form.clear('#create_directory_form');
        $('.create-directory').click();   
    });
});