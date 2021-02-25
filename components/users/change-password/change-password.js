'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules("#change_password_form",{
        inline: false,
        fields: {
            password: {
                rules: [{ type: "minLength[4]" }]
            },
            repeat_password: {              
                rules: [
                    { type: "minLength[4]" },
                    { type: "match[password]" }
                ]
            }
        }
    });
    
    arikaim.ui.button('#login_page_link',function(element) {
        arikaim.page.loadContent({
            id : 'change_password_panel',
            component: 'files:users.login'
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