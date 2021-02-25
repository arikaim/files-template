'use strict';

arikaim.component.onLoaded(function() {
    var type = $('#preview_file_type').attr('file-type');
 
    if (type == 'text') {
        var url = $('#code').attr('url');      
        arikaim.get(url,function(result) {
            var code = document.querySelector('#code');
            code.innerHTML = arikaim.text.escapeHtml(result);
            hljs.highlightBlock(code);
        });
    }

    if (type == 'pdf') {      
        var workerUrl =  $('#pdf_view_container').attr('worker');   
        var url = $('#pdf_view_container').attr('url');    
        pdfView.init({
            workerUrl: workerUrl
        });
        pdfView.openFile(url);       
    }
});