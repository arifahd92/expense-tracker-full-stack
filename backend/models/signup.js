const sequelize = require ('../db/connection');
const Sequelize = require ('sequelize');
const Signup = sequelize.define ('signup', {
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
});
module.exports = Signup;
