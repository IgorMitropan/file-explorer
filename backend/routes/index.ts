import Router from 'koa-router';
import { readDirectoryTree } from '../utils';
import { ICustomAppContext } from '../interfaces';

const router = new Router<any, ICustomAppContext>();

/**
 * Base route, redirects to static html
 */
router.redirect('/', '/index.html');

/**
 * Basic health check
 */
router.get('/status', async ctx => ctx.body = { status: 'Server is up and running' });

/**
 * Route to get specified directories trees structure
 */
router.get('/dir-trees', async ctx => {
    const body = {};
    for (const directory of ctx.config.watchDirectories) {
        body[directory.name] = await readDirectoryTree(directory.absPath);
    }

    ctx.body = body;
});

export const routes = router.routes();
