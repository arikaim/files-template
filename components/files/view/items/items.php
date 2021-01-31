<?php 
/**
 *  Component: files.view.items
 */
use Arikaim\Core\Interfaces\View\ComponentDataInterface;
use Arikaim\Core\Db\Model;

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
        $file = Model::Files('storage');
        $userId = $container->get('access')->getId();
        $storage = $container->get('storage');
        $driverName = $params['driver_name'] ?? null;
   
        if (empty($driverName) == false) {           
            // mount remote 
            $filesystem = $driverName;
            $model = Model::StorageFilesystems('storage');
            
            $config = $model->getConfig($userId,$driverName);
            $driver = $container->get('driver')->create($driverName,[],$config);
            $storage->mountFilesystem($driverName,$driver->getFilesystem());
            
            $connectionStatus = ($model->status != 1) ? $driver->checkConnection() : true;
            $filesystemPath = $driver->getRootPath();
          
        } else {
            // mount local
            $filesystem = $file->getUserFilesystemName();
            $filesystemPath = $file->getUserFilesystemPath($userId);
            $storage->mountLocal($filesystem,$filesystemPath);
            $connectionStatus = true;
        }

        return [
            'filesystem'        => $filesystem,
            'filesystem_path'   => $filesystemPath,            
            'connection_status' => $connectionStatus,
            'files'             => $file,
            'user_id'           => $userId
        ];
    }
};
