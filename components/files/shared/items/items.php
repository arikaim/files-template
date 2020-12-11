<?php 
/**
 *  Component: files.shared.items
 */
use Arikaim\Core\Interfaces\View\ComponentDataInterface;
use Arikaim\Core\Db\Model;
use Arikaim\Core\Db\Search;

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
        $userId = $container->get('access')->getId();
        $search = Search::getSearchValue('search_text','files');
        $model = Model::FilePermissions('storage');

        $model = $model
            ->selectRaw(' DISTINCT entity_id ')
            ->permissionsForUser($userId)
            ->whereHas('file',function($query) use($search) {
                $search = \strtoupper($search);
                $query->whereRaw('UPPER(path) LIKE ?',['%' . $search . '%']);
            });
       
        return [
            'user_id' => $userId,
            'search'  => $search,
            'files'   => $model
        ];
    }
};
