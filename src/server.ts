import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', () => {
  errorLogger.error('Uncaught exception is detected');
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Successfully connected to Mongo');
    server = app.listen(config.port, () => {
      logger.info(` app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect to Mongo`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// process.on("SIGTERM", (err) => {
//   logger.info("SIGTERM is Received", err);
//   if (server) {
//     server.close();
//   }
// });
