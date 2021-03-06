import * as Router from 'koa-router';
import { getServerConfig } from '../../controllers/server-config';

/**
 * AppConfig
 */

const router = new Router({ prefix: '/app-config' });

router.get('/', async function (ctx) {
  const hasSession = !!(ctx.session && ctx.session.user);
  const { useOpenIDConnect, OIDCPProviderURL } = getServerConfig();
  ctx.body = { useOpenIDConnect, OIDCPProviderURL, hasSession };
});

export { router };
