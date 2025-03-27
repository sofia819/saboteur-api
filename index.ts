import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';

const server = Fastify({
  logger: true,
});
const port = Number.parseInt(process.env.PORT || '5000');
const allowedUrls = (process.env.ALLOWED_URLS || '').split(',');
const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`;

server.register(cors, {
  origin: (origin, callback) => {
    //  Request from allowed URLs will pass
    if (!origin || allowedUrls.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'), false);
    }
  },
});
server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
