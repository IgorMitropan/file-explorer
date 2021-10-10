import chokidar from 'chokidar';
import { EventEmitter } from 'events';
import * as Logger from 'bunyan';
import { IWatchDirectory } from '../interfaces';
import { encodePath } from '../utils';

export class DirectoriesObserver extends EventEmitter {
    private logger: Logger;

    constructor(logger: Logger, directories: IWatchDirectory[]) {
        super();
        this.logger = logger;
        directories.forEach(dir => this.watchDirectory(dir));
    }

    private watchDirectory(directory: IWatchDirectory): void {
        try {
            this.logger.warn(`Start watching for directory ${directory.name} changes`);

            const watcher = chokidar.watch(directory.absPath, { persistent: true });
            watcher.on('ready', () => {
                watcher.on('all', (
                    eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
                    path: string
                ) => {
                    // We don't need absolute path, but rather path in the directory we are watching.
                    const pathInDirectory = path.replace(directory.absPath, '');

                    if (eventName === 'add') {
                        this.handleEvent('added', directory.name, pathInDirectory, 'file');
                    }
                    if (eventName === 'addDir') {
                        this.handleEvent('added', directory.name, pathInDirectory, 'directory');
                    }
                    if (eventName === 'unlink') {
                        this.handleEvent('removed', directory.name, pathInDirectory, 'file');
                    }
                    if (eventName === 'unlinkDir') {
                        this.handleEvent('removed', directory.name, pathInDirectory, 'directory');
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    private handleEvent(
        event: 'added' | 'removed',
        dirName: string,
        path: string,
        itemType: 'file' | 'directory'
    ): void {
        this.logger.warn(`${itemType} ${path} has been ${event} in the directory ${dirName}`);

        // We need to encode path (replace dots) before sending in order to make update on the frontend more simple
        const encodedPath = encodePath(path);

        // emit an event when new file or directory has been added or removed
        this.emit(event, {
            directory: dirName,
            path: encodedPath,
            itemType
        });
    }
}
