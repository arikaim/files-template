'use strict';

$(document).ready(function() {
    $('.mobile-menu').dropdown({});
    
    $('#language_dropdown').dropdown({
        onChange: function(value) {       
            arikaim.setLanguage(value);
        }
    });
});