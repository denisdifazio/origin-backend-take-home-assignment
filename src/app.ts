import fastify from 'fastify';
import oas from 'fastify-oas';

export default async function create() {
  const server = fastify();

  // oas must be first to be registered
  server.register(oas, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Risk Profile API',
      },
      consumes: ['application/json'],
      servers: [],
      tags: [],
    },
    exposeRoute: true,
  });

  await server.ready();

  server.oas();

  return server;
}
