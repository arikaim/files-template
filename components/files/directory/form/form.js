'use strict';

$(document).ready(function() {
    arikaim.ui.form.addRules("#create_directory_form",{
        inline: false,
        fields: {
            name: {
            identifier: "name",      
                rules: [{
                    type: "minLength[1]"       
                }]
            }
        }
    });   

    arikaim.ui.button('.cancel-button',function(element) {
        arikaim.ui.form.clear('#create_directory_form');
        $('.create-directory').click();   
    });
});