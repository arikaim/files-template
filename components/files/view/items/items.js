'use strict';

arikaim.component.onLoaded(function() {
    safeCall('filesView',function(obj) {
        obj.initRows();
    },false);
});