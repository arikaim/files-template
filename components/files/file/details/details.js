'use strict';

$(document).ready(function() {
    arikaim.ui.button('.close-details-button',function(element) {
        var onClose = $(element).attr('on-close');       
        $('#file_details_content').transition({
            animation: 'fade left out',
            onComplete: function() { 
                if (onClose != 'hide') {                               
                    filesView.loadPathDetails();
                } else {
                    $('#file_details_content').html('');
                }
            },
            reverse: false
        });                           
    });  
});