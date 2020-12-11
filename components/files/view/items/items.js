'use strict';

$(document).ready(function() {
    safeCall('filesView',function(obj) {
        obj.initRows();
    },false);
});