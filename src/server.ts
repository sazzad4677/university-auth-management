import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, logger } from "./shared/logger";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("Successfully connected to Mongo");
    app.listen(config.port, () => {
      logger.info(` app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect to Mongo`, error);
  }
}
main();
