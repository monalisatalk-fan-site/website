import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
// @ts-expect-error
import * as sapper from '@sapper/server';

const { PORT, HOST, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .listen(PORT, HOST, (err: unknown) => {
    if (err) {
      console.error(err);
    }
  });
