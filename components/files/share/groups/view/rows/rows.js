'use strict';

$(document).ready(function() {  
    safeCall('fileGroupPermissions',function(obj) {
        obj.initRows();
    },true);    
}); 