'use strict';

$(document).ready(function() {
    $('.show-popup').popup({});

    breadcrumb.init({
        onSelect: function(path) {  
            filesView.openDirectory(path);            
        }
    });
});