'use strict';

$(document).ready(function() {
    safeCall('sharedFiles',function(obj) {
        obj.initRows();
    },false);     
});