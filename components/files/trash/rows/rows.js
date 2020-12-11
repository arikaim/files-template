'use strict';

$(document).ready(function() {
    safeCall('trashView',function(obj) {
        obj.initRows();
    },true);   
});