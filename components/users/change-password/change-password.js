'use strict';

$(document).ready(function() {
    arikaim.ui.button('#login_page_link',function(element) {
        arikaim.page.loadContent({
            id : 'change_password_panel',
            component: 'users>users.login'
        });
    });

    arikaim.ui.form.onSubmit('#change_password_form',function() {    
       return users.changePassword('#change_password_form');
    },function(result) {
        arikaim.ui.form.showMessage({
            selector: '#change_password_form',
            message: result.message,
            hide: 0
        });
        $('#login_link').removeClass('hidden');
    });
});