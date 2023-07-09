import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Successfully connected to Mongo");
    app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect to Mongo`, error);
  }
}
main();
