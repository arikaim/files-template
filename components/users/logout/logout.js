'use strict';

arikaim.component.onLoaded(function() {
    users.logout(function(result) {
        var redirectUrl = (isEmpty(result.redirect_url) == true) ? '/' : result.redirect_url;
        arikaim.loadUrl(redirectUrl);
    });
});