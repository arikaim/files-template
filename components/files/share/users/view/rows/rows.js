'use strict';

$(document).ready(function() {  
    safeCall('filePermissions',function(obj) {
        obj.initRows();
    },true);    
}); 