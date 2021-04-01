'use strict';

arikaim.component.onLoaded(function() { 
    arikaim.ui.button('#login_page_link',function(element) {
        arikaim.page.loadContent({
            id : 'login_content',
            component: 'files:users.login'
        });
    });
});