'use strict';

arikaim.component.onLoaded(function() {
    var userOptions = new OrmOptions('/api/users/options','/api/users/option/save');
    userOptions.initCheckboxFields();    
});