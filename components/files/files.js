/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function FilesApi() {

    this.addUserPermission = function(userName, fileId, permissions, onSuccess, onError) {
        var data = {
            user: userName,
            entity: fileId,
            permissions: permissions
        };

        return arikaim.put('/api/storage/permission/add/user',data,onSuccess,onError);
    };

    this.deletePermission = function(uuid, onSuccess, onError) {
        return arikaim.delete('/api/storage/permission/delete/' + uuid,onSuccess,onError);
    };

    this.createDirectory = function(data, onSuccess, onError) {
        return arikaim.post('/api/storage/directory',data,onSuccess,onError);
    };

    this.deleteDirectory = function(path, uuid, onSuccess, onError) {
        var data = {
            path: path,
            uuid: uuid
        };

        return arikaim.put('/api/storage/directory/delete',data,onSuccess,onError);
    };

    this.setPublic = function(uuid, isPublicFile, onSuccess, onError) {
        isPublicFile = (isEmpty(isPublicFile) == true) ? null : isPublicFile;
        var data = {
            uuid: uuid,
            public: isPublicFile
        }
        
        return arikaim.put('/api/storage/public/update',data,onSuccess,onError);
    };

    this.updateNote = function(formId, onSuccess, onError) {
        return arikaim.put('/api/storage/note/update',formId,onSuccess,onError);
    };

    this.moveToTrash = function(path, fileName, onSuccess, onError) {
        var data = {
            path: path,
            name: fileName
        };

        return arikaim.put('/api/storage/move/trash',data,onSuccess,onError);
    };

    this.restore = function(path, onSuccess, onError) {
        var data = {
            path: path          
        };
        
        return arikaim.put('/api/storage/restore',data,onSuccess,onError);
    };
    
    this.emtyTrash = function(onSuccess, onError) {
        return arikaim.delete('/api/storage/trash/empty',onSuccess,onError);
    };

    this.restoreTrash = function(onSuccess, onError) {
        return arikaim.put('/api/storage/trash/restore',{},onSuccess,onError);
    };
}

var files = new FilesApi();