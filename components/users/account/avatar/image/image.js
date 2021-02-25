'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.button('.remove-avatar',function(element) {       
        return users.deleteAvatar(function(result) {
            arikaim.page.loadContent({
                id: 'avatar_image',
                params: { },
                component: 'files:users.avatar.image'
            },function(result) {

            });
        })       
    });
});