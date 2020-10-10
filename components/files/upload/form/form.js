'use strict';

$(document).ready(function() {
    arikaim.ui.form.addRules("#file_form");
    arikaim.ui.button('.cancel-button',function(element) {
        arikaim.ui.form.clear('#file_form');
        $('#file_details').hide();   
    });
});