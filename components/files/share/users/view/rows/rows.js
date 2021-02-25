'use strict';

arikaim.component.onLoaded(function() { 
    safeCall('filePermissions',function(obj) {
        obj.initRows();
    },true);    
}); 