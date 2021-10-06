import Router from 'koa-router';
import { readDirectoryTree, convertToAbsolutePath } from '../utils';
import { config } from '../config';

const router = new Router();

/**
 * Base route, redirects to static html
 */
router.redirect('/', '/index.html');

/**
 * Basic health check
 */
router.get('/status', async ctx => ctx.body = { status: 'Server is up and running' });

/**
 * Route to get specified directories structure
 */
router.get('/dir-structure', async ctx => {
    const body = {};
    for (const directory of config.watchDirectories) {
        body[directory] = await readDirectoryTree(convertToAbsolutePath(directory));
    }

    ctx.body = body;
});

export const routes = router.routes();
