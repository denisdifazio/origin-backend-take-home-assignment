import serverBuild from './app';

const start = async (): Promise<void> => {
  try {
    const server = await serverBuild();

    const port = process.env['PORT'] || 3000;

    // By default fastify will bind to localhost, so we should mention 0.0.0.0 explicitly when using docker without root user
    // https://github.com/fastify/fastify/issues/935
    await server.listen(port, '0.0.0.0');
  } catch (err) {
    process.exit(1);
  }
};

start();
