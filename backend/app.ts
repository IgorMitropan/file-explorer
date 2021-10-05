import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import serve from 'koa-static';
import koaBunyanLogger from 'koa-bunyan-logger';
import { createServer } from 'http';
import { Server } from 'socket.io';
import open from 'open';

import { config } from './src/config';
import { routes } from './src/routes';
import { logger } from './src/services/logger';
import { Observer} from './src/services/observer';

const app = new Koa();
const httpServer = createServer(app.callback());
const observer = new Observer(config.watchFolders);

app.use(koaBody());
app.use(cors());
app.use(koaBunyanLogger(logger));
app.use(koaBunyanLogger.requestLogger());
app.use(koaBunyanLogger.timeContext());
app.use(routes);
app.use(serve(config.staticDirPath));

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(`Socket connection successfully established with id - ${socket.id}
    `);

    observer.on('added', (payload) => {
        socket.broadcast.emit('added', payload);
    });
    observer.on('removed', (payload) => {
        socket.broadcast.emit('removed', payload);
    });
});


export const server = httpServer.listen(config.port);
console.log(`Koa server is listening on port ${config.port}
`);

// We use open module to support all OS and serve index.html as an entrypoint of the SPA frontend bundle
open(`http://localhost:${config.port}/`)
    .then(() => console.log(`React SPA opened in the default browser from ${config.staticDirPath}
    `))
    .catch(() => console.error('React SPA cannot be opened'));
