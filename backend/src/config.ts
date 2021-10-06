import { LogLevelString } from 'bunyan';
import * as bunyan from 'bunyan';
import { convertToAbsolutePath } from './utils';

const staticDirPath = convertToAbsolutePath(process.env.STATIC_DIR || '../../../../frontend/build');
const watchDirectories = (process.env.DIRECTORIES || '../../../../frontend/build ~/Desktop')
    .split(' ');

export interface IConfig {
    port: number;
    logLevel: LogLevelString;
    staticDirPath: string;
    watchDirectories: string[];
}

export const config: IConfig = {
    port: parseInt(process.env.PORT, 10) || 3000,
    logLevel: (process.env.LOG_LEVEL as bunyan.LogLevelString) || 'warn',
    staticDirPath,
    watchDirectories
};
