import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

const dirPaths = process.argv.slice(2);
const errors = [];

// First checking that all passed arguments are existing directories
dirPaths.forEach(dirPath => {
    try {
        const dirStatus = fs.statSync(dirPath);
        if (!dirStatus.isDirectory()) {
            errors.push(`The passed argument ${dirPath} is not a directory`);
        }
        fs.readdirSync(dirPath);
    } catch (e) {
        errors.push(e.message);
    }
});

if (errors.length) {
    console.error(errors);
    process.exit(1);
}

// Setting the required env variables
dotenv.config();
process.env.DIRECTORIES = dirPaths.join(' ');
process.env.PROJECT_DIR = path.resolve();

// Starting Node server, redirecting it's output to the console,
// and opening the default browser to serve index.html as an entrypoint for the React SPA build.
const server = spawn('node', ['./dist/app.js']);
server.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
});
server.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});
server.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
});

