<?php 
/**
 *  Component: files.trash.rows
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
        $filesystem = $file->getUserFilesystemName();
        $userId = $container->get('access')->getId();
        $filesystemPath = $file->getUserFilesystemPath($userId);
        $container->get('storage')->mountLocal($filesystem,$filesystemPath);

        return [
            'filesystem'      => $filesystem,
            'filesystem_path' => $filesystemPath,
            'bin_path'        => $container->get('storage')->getRecyleBinPath()
        ];
    }
};
