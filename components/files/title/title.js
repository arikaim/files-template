'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.button('.close-button',function(element) {              
        $('#file_details').fadeOut(500);  
        $('#file_details').hide();
    });
});