import chokidar from 'chokidar';
import { EventEmitter } from 'events';
import * as Logger from 'bunyan';
import { IWatchDirectory } from '../interfaces';

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
                    // We don't need absolute path, but rather path in the directory we are watching
                    const pathInDirectory = path.replace(directory.absPath, '');

                    if (eventName === 'add' || eventName === 'addDir') {
                        this.handleEvent('added', directory.name, pathInDirectory)
                    }
                    if (eventName === 'unlink' || eventName === 'unlinkDir') {
                        this.handleEvent('removed', directory.name, pathInDirectory)
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    private handleEvent(event: 'added' | 'removed', dirName: string, path: string): void {
        this.logger.warn(`${path} has been ${event} in the directory ${dirName}`);

        // emit an event when new file or directory has been added or removed
        this.emit(event, {
            directory: dirName,
            path
        });
    }
}
