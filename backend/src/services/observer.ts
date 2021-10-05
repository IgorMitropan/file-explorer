import chokidar from 'chokidar';
import { EventEmitter } from 'events';
import { convertToAbsolutePath } from '../utils';

export class Observer extends EventEmitter {
    public folders: string[];

    constructor(folders: string[]) {
        super();
        this.folders = folders;
        folders.forEach(folder => this.watchFolder(folder));
    }

    private watchFolder(folder: string): void {
        const folderPath = convertToAbsolutePath(folder);
        try {
            console.log(
                `Start watching for folder changes on: ${folder}`
            );

            const watcher = chokidar.watch(folderPath, { persistent: true });
            watcher.on('ready', () => {
                watcher.on('add', async filePath => {
                    console.log(
                        `[${new Date().toLocaleString()}] ${filePath} has been added.`
                    );

                    // emit an event when new file has been added
                    this.emit('added', {
                        folder,
                        filePath
                    });
                });

                watcher.on('unlink', async filePath => {
                    console.log(
                        `[${new Date().toLocaleString()}] ${filePath} has been removed.`
                    );

                    // emit an event when new file has been added
                    this.emit('removed', {
                        folder,
                        filePath
                    });
                });

                watcher.on('addDir', async filePath => {
                    console.log(
                        `[${new Date().toLocaleString()}] ${filePath} has been added.`
                    );

                    // emit an event when new file has been added
                    this.emit('added', {
                        folder,
                        filePath
                    });
                });

                watcher.on('unlinkDir', async filePath => {
                    console.log(
                        `[${new Date().toLocaleString()}] ${filePath} has been removed.`
                    );

                    // emit an event when new file has been added
                    this.emit('removed', {
                        folder,
                        filePath
                    });
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}
