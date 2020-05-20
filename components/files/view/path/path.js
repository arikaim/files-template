'use strict';

arikaim.page.onReady(function() {
    breadcrumb.init({
        onSelect: function(path) {  
            arikaim.page.loadContent({
                id: 'view_content',           
                component: 'storage>files.view.items',
                params: { 
                    path: path               
                }
            },function(result) {
                filesView.initRows();
            }); 
        }
    });
});