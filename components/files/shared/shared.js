/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function SharedFiles() {
    var self = this;

    this.init = function() {    
        paginator.init('files_items');    

        viewTypeButton.init(function(view) {             
            arikaim.page.loadContent({
                id: 'files_items',           
                component: 'storage>files.shared.items',
                params: {                 
                    view_type: view 
                }
            });           
        });          
    };

    this.initRows = function() { 
        $('.file-link-button').popup({
            on: 'click'
        });
        
        $('.file-actions').dropdown({});          
    };
}

var sharedFiles = new SharedFiles();

arikaim.page.onReady(function() {
    sharedFiles.init();
    sharedFiles.initRows();
});