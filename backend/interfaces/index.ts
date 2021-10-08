import { LogLevelString } from 'bunyan';

export interface IConfig {
    port: number;
    logLevel: LogLevelString;
    projectDir: string;
    staticDir: string;
    watchDirectories: string[];
}

export interface ICustomAppContext {
    config: IConfig;
}
export interface DirectoryUpdatePayload {
    directory: string;
    path: string;
}
