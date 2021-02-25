'use strict';

arikaim.component.onLoaded(function() {
    $('#access').checkbox({
        onChecked: function() {   
            var uuid = $(this).attr('uuid');         
            files.setPublic(uuid,1,function(result) {
                $('#users_tab').hide();
                $('#groups_tab').hide();
                arikaim.ui.setActiveTab('#note_tab','.share-tab-item');
                var uuid = $('#note_tab').attr('uuid');
                arikaim.page.loadContent({
                    id: 'share_tab_content',
                    component: 'files:files.share.note',
                    params: { uuid: uuid }
                });             
            });
         },
         onUnchecked: function() { 
            var uuid = $(this).attr('uuid');      
            files.setPublic(uuid,0,function(result) {
                $('#users_tab').show();
                $('#groups_tab').show();
                arikaim.ui.setActiveTab('#users_tab','.share-tab-item');
                var uuid = $('#users_tab').attr('uuid');
                var file = $('#users_tab').attr('file');
                
                arikaim.page.loadContent({
                    id: 'share_tab_content',
                    component: 'files:files.share.users',
                    params: { 
                        uuid: uuid,
                        file: file
                    }
                });                  
            });
         }
    });

    arikaim.ui.tab('.share-tab-item','share_tab_content',['uuid','file']);   
});