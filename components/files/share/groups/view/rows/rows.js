'use strict';

arikaim.component.onLoaded(function() { 
    safeCall('fileGroupPermissions',function(obj) {
        obj.initRows();
    },true);    
}); 