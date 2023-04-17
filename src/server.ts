import "reflect-metadata";
import { connectionDB } from "./main/config/sqliteConfig";
import Logger from "./main/provider/Logger";
import app from "./main/config/app";

connectionDB
  .initialize()
  .then(() => {
    Logger.info("Connected to the database!");

    app.listen(4000, () => {
      Logger.info("Server started on port 4000!");
    });
  })
  .catch((err) => {
    Logger.error("Error connecting to the database: " + err);
    process.exit();
  });
