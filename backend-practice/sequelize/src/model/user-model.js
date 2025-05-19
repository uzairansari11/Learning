const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db-connection");

const UserModel = sequelize.define("user", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { UserModel };
