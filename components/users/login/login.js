'use strict';

arikaim.page.onReady(function() {
    arikaim.ui.form.addRules("#login_form",{
        inline: false,
        fields: {
            password: {
                identifier: 'password',
                rules: [{ type: "minLength[4]" }]
            },
            user_name: {
                identifier: 'user_name',
                rules: [{ type: "minLength[2]" }]
            }
        }
    });   

    arikaim.ui.button('#forgotten_button',function() {
        return arikaim.page.loadContent({
            id : 'login_panel',
            component: 'users>users.reset-password'
        });
    });
    
    arikaim.ui.form.onSubmit('#login_form',function() {        
        return users.login();
    },function(result) {   
        arikaim.ui.hide('.message');

        if (isEmpty(result.redirect_url) == false) {
            arikaim.loadUrl(result.redirect_url);
        } else {
            callFunction(users.onLogin,result); 
        }           
    },function(errors) {
        if (users.getLoginAttempts() > 0) {          
            arikaim.page.loadContent({
                id : 'captcha_panel',
                component: 'captcha::code',
                replace: true
            });
        }
    });
});