'use strict';

$(document).ready(function() {

    $('.file-button').removeClass('active');
    $('.file-button').attr('active','false');

    arikaim.ui.button('.close-button',function(element) {       
        $('#file_details').hide();   
    });

    $('.files-dropdown').on('change',function(element) {
        var selected = $(this).dropdown('get value');    
        if (isEmpty(selected) == true) {
            $('#form_content').html("");
        } else {
            arikaim.page.loadContent({
                id: 'form_content',
                component: 'files>files.share.access',
                params: { uuid: selected }
            },function(result) {              
            });  
        }            
    });   
});