'use strict';

$(document).ready(function () {    
    arikaim.ui.button('#login_page_link',function(element) {
        arikaim.page.loadContent({
            id : 'reset_password_panel',
            component: 'users>users.login'
        });
    });
});