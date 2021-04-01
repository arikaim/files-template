<?php 
/**
 *  Component: files.shared.items
 */
use Arikaim\Core\Interfaces\View\ComponentDataInterface;
use Arikaim\Core\Db\Model;
use Arikaim\Core\Db\Search;
use Arikaim\Core\Arikaim;

/**
 * Data class
 */
return new class() implements ComponentDataInterface
{
    /**
     * Get component data
     *
     * @param array $params
     * @param ContainerInterface|null $container
     * @return array
     */
    public function getData(array $params = [], $container = null): array
    {
        $path = $params['path'] ?? '';
        $folderId = $params['folder_id'] ?? null;
        $userId = Arikaim::get('access')->getId();
        $search = Search::getSearchValue('search_text','files');
        $model = Model::FilePermissions('storage');

        if (empty($path) == false) {
            if (empty($folderId) == false) {
                $files = Model::Files('storage');
                $folder = $files->findById($folderId);
                if (\is_null($folder) == false) {
                    if ($folder->hasAccess($userId,['read']) == true) {                    
                        if (empty($search) == true) {
                            $search = \trim($path) . DIRECTORY_SEPARATOR;                        
                        } else {
                            $search = \trim($path) . DIRECTORY_SEPARATOR . '%' . \trim($search) . '%';
                        }
                        $model = $files->folderFiles($search);       
                    } 
                }    
            }                    
        } else {
            $model = $model
                ->selectRaw(' DISTINCT entity_id ')
                ->permissionsForUser($userId)
                ->whereHas('file',function($query) use($search) {
                    $search = \strtoupper($search);
                    $query->whereRaw('UPPER(path) LIKE ?',['%' . $search . '%']);
                });
        }
        
        return [
            'path'      => $path,
            'folder_id' => $folderId,
            'user_id'   => $userId,
            'search'    => $search,
            'files'     => $model
        ];
    }
};
