'use strict';

arikaim.component.onLoaded(function() {
    $('.show-popup').popup({});

    breadcrumb.init({
        onSelect: function(path) {  
            filesView.openDirectory(path);            
        }
    });
});