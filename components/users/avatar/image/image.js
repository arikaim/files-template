"use strict";

$(document).ready(function() {

    arikaim.ui.button('.remove-avatar',function(element) {       
        return users.deleteAvatar(function(result) {
            arikaim.page.loadContent({
                id: 'avatar_image',
                params: { },
                component: 'users>users.avatar.image'
            },function(result) {

            });
        })       
    });
});