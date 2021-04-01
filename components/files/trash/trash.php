<?php 
/**
 *  Component: files.trash
 */
use Arikaim\Core\Interfaces\View\ComponentDataInterface;
use Arikaim\Core\Db\Model;
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
        $file = Model::Files('storage');
        $filesystem = $file->getUserFilesystemName();
        $userId = Arikaim::get('access')->getId();
        $storage = Arikaim::get('storage');

        $filesystemPath = $file->getUserFilesystemPath($userId);
        $storage->mountLocal($filesystem,$filesystemPath);
      
        return [
            'filesystem'      => $filesystem,
            'filesystem_path' => $filesystemPath,
            'bin_path'        => $storage->getRecyleBinPath(),
            'empty'           => $storage->isEmpty($storage->getRecyleBinPath(),$filesystem)
        ];
    }
};
