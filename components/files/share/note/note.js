'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.onSubmit('#file_note_form',function() {
        return files.updateNote('#file_note_form');
    },function(result) {       
        arikaim.ui.form.showMessage(result.message);       
    }); 
});