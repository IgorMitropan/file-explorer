import { LogLevelString } from 'bunyan';
import * as bunyan from 'bunyan';
import { convertToAbsolutePath } from './utils';

const staticDirPath = convertToAbsolutePath(process.env.STATIC_DIR || '../../../../frontend/build');
const watchFolders = (process.env.FOLDERS || '../../../../frontend/build ~/Desktop')
    .split(' ');

export interface IConfig {
    port: number;
    logLevel: LogLevelString;
    staticDirPath: string;
    watchFolders: string[];
}

export const config: IConfig = {
    port: parseInt(process.env.PORT, 10) || 3000,
    logLevel: (process.env.LOG_LEVEL as bunyan.LogLevelString) || 'warn',
    staticDirPath,
    watchFolders
};
