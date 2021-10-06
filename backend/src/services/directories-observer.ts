import chokidar from 'chokidar';
import { EventEmitter } from 'events';
import * as Logger from 'bunyan'
import { convertToAbsolutePath } from '../utils';

export class DirectoriesObserver extends EventEmitter {
    private logger: Logger;
    constructor(logger: Logger, directories: string[]) {
        super();
        this.logger = logger;
        directories.forEach(dir => this.watchDirectory(dir));
    }

    private watchDirectory(directory: string): void {
        const dirAbsolutePath = convertToAbsolutePath(directory);
        try {
            this.logger.warn(`Start watching for directory ${dirAbsolutePath} changes`);

            const watcher = chokidar.watch(dirAbsolutePath, { persistent: true });
            watcher.on('ready', () => {
                watcher.on('all', (
                    eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
                    path: string
                ) => {
                    // We don't need absolute path, but rather path in the directory we are watching
                    const pathInDirectory = path.replace(dirAbsolutePath, '');

                    if (eventName === 'add' || eventName === 'addDir') {
                        this.handleEvent('added', directory, pathInDirectory)
                    }
                    if (eventName === 'unlink' || eventName === 'unlinkDir') {
                        this.handleEvent('removed', directory, pathInDirectory)
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    private handleEvent(event: 'added' | 'removed', directory: string, path: string): void {
        this.logger.warn(`${path} has been ${event} in the directory ${directory}`);

        // emit an event when new file or directory has been added or removed
        this.emit(event, {
            directory,
            path
        });
    }
}
