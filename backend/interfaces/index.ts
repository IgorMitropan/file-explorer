import { LogLevelString } from 'bunyan';

export interface IWatchDirectory {
  name: string;
  absPath: string;
}
export interface IConfig {
  port: number;
  logLevel: LogLevelString;
  projectDir: string;
  staticDir: string;
  watchDirectories: IWatchDirectory[];
}

export interface ICustomAppContext {
  config: IConfig;
}
export interface IDirectoryUpdatePayload {
  directory: string;
  path: string;
  itemType: 'file' | 'directory';
}
