import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import serve from 'koa-static';
import koaBunyanLogger from 'koa-bunyan-logger';
import { createServer } from 'http';
import { Server } from 'socket.io';
import open from 'open';

import { config } from './config';
import { routes } from './routes';
import { DirectoriesObserver, logger } from './services';
import { DirectoryUpdatePayload, ICustomAppContext } from './interfaces';

const app = new Koa<any, ICustomAppContext>();
const httpServer = createServer(app.callback());
const directoriesObserver = new DirectoriesObserver(logger, config.watchDirectories);

app.context.config = config;
app.use(koaBody());
app.use(cors());
app.use(koaBunyanLogger(logger));
app.use(koaBunyanLogger.requestLogger());
app.use(koaBunyanLogger.timeContext());
app.use(routes);
app.use(serve(config.staticDir));

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    logger.info(`Socket connection successfully established with id - ${socket.id}
    `);

    directoriesObserver.on('added', (payload: DirectoryUpdatePayload) => {
        socket.broadcast.emit('added', payload);
    });
    directoriesObserver.on('removed', (payload: DirectoryUpdatePayload) => {
        socket.broadcast.emit('removed', payload);
    });
});


export const server = httpServer.listen(config.port);
logger.warn(`Koa server is listening on port ${config.port}
`);

// We use open module to support all OS and serve index.html as an entrypoint of the SPA frontend bundle
open(`http://localhost:${config.port}/`)
    .then(() => logger.warn(`React SPA opened in the default browser from ${config.staticDir}
    `))
    .catch(() => logger.error('React SPA cannot be opened'));
