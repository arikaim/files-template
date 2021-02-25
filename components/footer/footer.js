'use strict';

arikaim.component.onLoaded(function() {
    var cookieDialog = new CookieDialog();
    cookieDialog.init('toast',{
        position: 'bottom right',
        interval: 10
    });
});