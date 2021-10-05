import path from 'path';
import os from 'os';

export const convertToAbsolutePath = (dirPath: string): string => {
    if (dirPath[0] === '~') {
        return path.join(os.homedir(), dirPath.slice(1));
    }

    if (path.isAbsolute(dirPath)) {
        return dirPath;
    }

    return path.join(__dirname, dirPath);
}

