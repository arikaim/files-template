'use strict';

arikaim.component.onLoaded(function() {   
    arikaim.ui.button('.home-button',function(element) {     
        $('.sidebar').fadeToggle(800);
    });
});