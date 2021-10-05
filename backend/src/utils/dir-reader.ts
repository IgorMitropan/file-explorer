import fs from 'fs-extra';

export const readDirectoryTree = async (dirPath) => {
    const normalizedTree = {};
    let tree = await fs.readdir(dirPath);

    for (const item of tree) {
        const itemPath = `${dirPath}/${item}`;
        const itemStat = await fs.stat(itemPath);
        normalizedTree[item] = itemStat.isDirectory()
            ? await readDirectoryTree(itemPath)
            : null;
    }

    console.log(normalizedTree);

    return normalizedTree;
}
