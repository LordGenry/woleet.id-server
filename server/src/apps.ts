import './startup';
import * as routes from './api';
import { ports } from './config';
import * as Router from "koa-router";

import * as Debug from 'debug';
const debug = Debug('id:factory');

const names = ['api', 'identity', 'signature'];

interface AppDefinition {
  name: string;
  port: number;
  router: Router;
}

const defs: Dictionary<AppDefinition[]> = {};

for (const name of names) {
  const router: Router = routes[name];
  const port = ports[name];
  const app = { name, port, router };

  if (defs[port])
    defs[port].push(app);
  else
    defs[port] = [app];
}

export const apps = Object.keys(defs).reduce<AppDefinition[]>((acc, port) => {

  const apps: AppDefinition[] = defs[port];

  const app = apps.reduce<AppDefinition>((acc, app) => ({
    name: acc.name ? (acc.name + ', ' + app.name) : app.name,
    port: acc.port || app.port,
    router: acc.router.use(app.router.routes())
  }), { name: '', port: 0, router: new Router() })

  return [...acc, app];
}, []);

apps.forEach(({ name, port }) => debug(`[${name}] will listen on port ${port}`));