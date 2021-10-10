import { LogLevelString } from 'bunyan';
import { IConfig, IWatchDirectory } from './interfaces';
import { convertToAbsolutePath } from './utils';

const projectDir: string = process.env.PROJECT_DIR || '/Users/imytropan/WebstormProjects/file-explorer';
const staticDir: string = convertToAbsolutePath(process.env.FRONT_BUILD_DIR || './frontend/build', projectDir);
const watchDirectories: IWatchDirectory[] = (process.env.DIRECTORIES || '')
    .split(' ')
    .map(dir => ({
      name: dir,
      absPath: convertToAbsolutePath(dir, projectDir)
    }));

export const config: IConfig = {
  projectDir,
  staticDir,
  watchDirectories,
  port: parseInt(process.env.PORT, 10) || 3001,
  logLevel: (process.env.LOG_LEVEL as LogLevelString) || 'warn'
};
