const express = require("express");
const { dbConnection, sequelize } = require("./config/db-connection");
const app = express();

app.listen(8080, async () => {
  try {
    await dbConnection();
    await sequelize.sync({ alter: true });
    console.log("server running");
  } catch (error) {
    console.log(error);
  }
});
