'use strict';

arikaim.component.onLoaded(function() {
    $('.mobile-menu').dropdown({});
    
    $('#language_dropdown').dropdown({
        onChange: function(value) {       
            arikaim.setLanguage(value);
        }
    });
});