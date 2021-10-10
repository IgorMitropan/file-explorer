import fs from 'fs-extra';
import { encodePath } from './encodePath';

export const readDirectoryTree = async (dirPath) => {
    const normalizedTree = {};
    let tree = await fs.readdir(dirPath);

    for (const item of tree) {
        const itemPath = `${dirPath}/${item}`;
        // We need to encode item path in order to simplify frontend logic
        const encodedName = encodePath(item);
        const itemStat = await fs.stat(itemPath);
        normalizedTree[encodedName] = itemStat.isDirectory()
            ? await readDirectoryTree(itemPath)
            : null;
    }

    return normalizedTree;
}
