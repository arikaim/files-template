<?php 
/**
 *  Component: files.trash.rows
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
        $filesystemPath = $file->getUserFilesystemPath($userId);
        Arikaim::get('storage')->mountLocal($filesystem,$filesystemPath);

        return [
            'filesystem'      => $filesystem,
            'filesystem_path' => $filesystemPath,
            'bin_path'        => Arikaim::get('storage')->getRecyleBinPath()
        ];
    }
};
