'use strict';

$(document).ready(function() {
    arikaim.ui.form.addRules("#file_form",{
        inline: false,
        fields: {
            file: {
                rules: [{ type:'empty' }]
            },
            access: {
                rules: [{ type: "empty" }]
            }
        }
    });

    arikaim.ui.button('.cancel-button',function(element) {
        arikaim.ui.form.clear('#file_form');
        $('#file_details').hide();   
    });
});