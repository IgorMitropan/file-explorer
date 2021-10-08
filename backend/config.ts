import { LogLevelString } from 'bunyan';
import { IConfig } from './interfaces';
import { convertToAbsolutePath } from './utils';

const projectDir = process.env.PROJECT_DIR || '/Users/imytropan/WebstormProjects/file-explorer';
const staticDir = convertToAbsolutePath(process.env.STATIC_DIR || './frontend/build', projectDir);
const watchDirectories = (process.env.DIRECTORIES || './frontend/build ~/Desktop')
    .split(' ')
    .map(dir => convertToAbsolutePath(dir, projectDir));

export const config: IConfig = {
    port: parseInt(process.env.PORT, 10) || 3001,
    logLevel: (process.env.LOG_LEVEL as LogLevelString) || 'warn',
    projectDir,
    staticDir,
    watchDirectories
};
