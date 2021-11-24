import path from 'path';
import os from 'os';

/*
* @param dirPath - directory path, may be relative or absolute
* @param fromDir - optional absolute path to calculate relative path from. Equal to __dirname by default
 */
export const convertToAbsolutePath = (dirPath: string, fromDir: string = __dirname): string => {
  if (dirPath[0] === '~') {
    return path.join(os.homedir(), dirPath.slice(1));
  }

  if (path.isAbsolute(dirPath)) {
    return dirPath;
  }

  return path.join(fromDir, dirPath);
};
