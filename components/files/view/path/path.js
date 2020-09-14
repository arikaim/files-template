'use strict';

$(document).ready(function() {
    $('.show-popup').popup({});

    breadcrumb.init({
        onSelect: function(path) {  
            arikaim.page.loadContent({
                id: 'view_content',           
                component: 'files>files.view.items',
                params: { 
                    path: path               
                }
            },function(result) {
                filesView.initRows();
            }); 
        }
    });
});