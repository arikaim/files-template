'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.button('.close-details-button',function(element) {
        $('#file_details_content').html('');                    
    });  
});