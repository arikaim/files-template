'use strict';

$(document).ready(function() {
    var userOptions = new OrmOptions('/api/users/options','/api/users/option/save');
    userOptions.initCheckboxFields();    
});