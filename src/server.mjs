import mongoose from "mongoose";
import app from "./app.mjs";
import config from "./app/config/index.mjs";

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose
      .connect(config.database_url, { dbName: "Dream_Catcher" })
      .then(() => console.log("mongodb connect"));

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Not Connect", err.message);
  }
}
