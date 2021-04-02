'use strict';

arikaim.component.onLoaded(function() {
    breadcrumb.init({
        onSelect: function(path) {  
            filesView.openDirectory(path);            
        }
    });
});