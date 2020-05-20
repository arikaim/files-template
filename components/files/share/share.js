'use strict';

$(document).ready(function() {
    $('.files-dropdown').on('change',function(element) {
        var selected = $(this).dropdown('get value');    
        if (isEmpty(selected) == true) {
            $('#form_content').html("");
        } else {
            arikaim.page.loadContent({
                id: 'form_content',
                component: 'storage>files.share.access',
                params: { uuid: selected }
            },function(result) {              
            });  
        }            
    });   
});