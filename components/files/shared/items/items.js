'use strict';

arikaim.component.onLoaded(function() {
    safeCall('sharedFiles',function(obj) {
        obj.initRows();
    },false);     
});