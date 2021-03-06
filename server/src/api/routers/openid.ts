import * as Router from 'koa-router';
import { getClient, createOAuthUser, createOAuthSession, getClientRedirectURL } from '../../controllers/openid';

const router = new Router({ prefix: '/oauth' });

import { BadRequest, ServiceUnavailable } from 'http-errors';
import { Cache } from 'lru-cache';
import * as LRU from 'lru-cache';
import * as uuid from 'uuid/v4';
import { randomBytes } from 'crypto';
import { serializeUserDTO } from '../serialize/userDTO';
import * as log from 'loglevel';
import { cookies } from '../../config';
import { updateUser } from '../../controllers/user';

const lru: Cache<string, { state: string, nonce: string }> = new LRU({ maxAge: 90 * 1000, max: 1000 });

/**
 * @route: /oauth/login
 */
router.get('/login', async function (ctx) {
  const client = getClient();

  if (!client) {
    throw new ServiceUnavailable();
  }

  const oauth = uuid();
  const state = uuid();
  const nonce = randomBytes(8).toString('hex');
  const url = client.authorizationUrl({
    redirect_uri: getClientRedirectURL() /* TODO: check arg */,
    scope: 'openid profile email',
    response_type: 'code',
    state,
    nonce
  });

  lru.set(oauth, { state, nonce });
  ctx.cookies.set('oauth', oauth, cookies.options);
  ctx.redirect(url);
});

/**
 * @route: /oauth/callback
 */
router.get('/callback', async function (ctx) {
  const client = getClient();

  if (!client) {
    throw new ServiceUnavailable();
  }

  const oauth = ctx.cookies.get('oauth');

  if (!oauth) {
    throw new BadRequest('missing oauth session');
  }

  ctx.cookies.set('oauth', null);
  const oauthSession = lru.get(oauth);

  if (!oauthSession) {
    throw new BadRequest('invalid oauth session');
  }

  const { state, nonce } = oauthSession;

  let tokenSet;
  try {
    tokenSet = await client.authorizationCallback(
      getClientRedirectURL() /* TODO: check arg */,
      ctx.query,
      { response_type: 'code', state, nonce }
    );
  } catch (err) {
    log.warn(err);
    throw new BadRequest(err.message);
  }

  let info;
  try {
    info = await client.userinfo(tokenSet);
  } catch (err) {
    log.warn(err);
    throw new BadRequest(err.message);
  }

  if (!info.email) {
    throw new BadRequest('missing "email" response field');
  }

  if (!info.email_verified) {
    throw new BadRequest(info.email_verified === false ? 'Email must be validated' : 'Missing "email_verified" response field');
  }

  if (!info.name) {
    throw new BadRequest('missing "name" response field');
  }

  const session = await createOAuthSession(info.email);

  if (session) {
    ctx.cookies.set('session', session.token, cookies.options);

    if (session.user.x500CommonName !== info.name) {
      const user = session.user;
      log.debug(`User name changed from "${user.x500CommonName}" to "${info.name}"`);
      await updateUser(user.id, { identity: { commonName: info.name } });
      user.x500CommonName = info.name;
    }

    return ctx.body = { user: serializeUserDTO(session.user) };
  } else {
    const aio = await createOAuthUser({ email: info.email, identity: { commonName: info.name } });
    ctx.cookies.set('session', aio.token, cookies.options);
    return ctx.body = { user: serializeUserDTO(aio.user) };
  }
});

export { router };
