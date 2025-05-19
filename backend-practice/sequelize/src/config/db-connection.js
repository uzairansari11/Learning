const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sequelize-db", "root", "Uzair@7007", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});
const dbConnection = async () => {
  try {
    const response = await sequelize.authenticate();
    console.log("db connected successfully");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { dbConnection,sequelize };
