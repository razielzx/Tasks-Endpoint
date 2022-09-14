const { app } = require("./app");
const { initModels } = require("./models/initModels");
const { db } = require("./utils/db.util");
const dotenv = require("dotenv");

dotenv.config(".env");

const serverStart = async () => {
  try {

    await db.authenticate();

    initModels();
    
    await db.sync();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log("running port " + PORT);
    });

  } catch (error) {
    console.log(error);
  }
};
serverStart();
