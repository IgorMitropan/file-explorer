# File explorer
## Short project description
It is a “vs-code like” file explorer tree view. The file explorer component is rendering in a web browser and any changes on
the host within one of the specified directories
are reflected in the file explorer.
Find more details in [task-description.md](./task-description.md)

## How to run the project
1. Prerequisites: You need Node.js of version > 14.0 to be installed on you local machine
2. If you are using [nvm](https://github.com/nvm-sh/nvm) first run `nvm use`
3. Install all the required dependencies by running `npm install` (*Note:* There is a postinstall hook specified and it will build both backend and frontend parts)
4. Run either `npm start folder1 folder2... folderN` or `node file-explorer.mjs folder1 folder2 ... folderN`
#### Example usage:
```
node ./file-explorer.mjs ~/Desktop/ ./an/index-dir/
```
### Solution description:
1. Node module `file-explorer.mjs` verifies that all passed arguments are existing directories.
2. If so starts Node server on localhost (PORT can be specified in [.env](./.env) file, 3001 by default)
3. Then it opens the default browser to serve index.html as an entrypoint for the React SPA build.
4. The backend app uses [chokidar](https://github.com/paulmillr/chokidar) to watch passed directories and [socket.io](https://socket.io/) to send notification to the browser.
5. The frontend app uses [React](https://reactjs.org/) as a component library and [Redux](https://react-redux.js.org/) as an App Store to store directory trees
6. The recursive algorithm was used both on backend for composing  directory tree structure and on frontend for rendering tree structure. So it has limitation with max nested directories of 10000.

### Used technologies
#### Backend:
* [Node.js](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Koa](https://koajs.com/) 
* [fs-extra](https://github.com/jprichardson/node-fs-extra) to add promise support to the fs methods.
* [chokidar](https://github.com/paulmillr/chokidar) - Minimal and efficient cross-platform file watching library
* [socket.io](https://socket.io/) - library that enables real-time, bidirectional and event-based communication between the browser and the server.
* [Open](https://github.com/sindresorhus/open) to open URL in the browser. Cross-platform.

#### Frontend:
* [React](https://reactjs.org/)
* [Create React App](https://create-react-app.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Node Sass](https://github.com/sass/node-sass) preprocessor
* [React Redux](https://react-redux.js.org/) for App Store
* [Redux Toolkit](https://redux-toolkit.js.org/) as a simplified approach to work wit Redux
* [Lodash](https://lodash.com/) methods set and unnset were used for dir tree updates
* [React Icons](https://react-icons.github.io/react-icons/) for some file types representation


