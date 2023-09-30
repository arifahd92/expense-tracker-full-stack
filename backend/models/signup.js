const sequelize = require ('../db/connection');
const Sequelize = require ('sequelize');
const User = sequelize.define ('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  premium: {
    type: Sequelize.BOOLEAN,
  },
});
module.exports = User;
