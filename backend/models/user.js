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
  totalMovieExpense: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalShoppingExpense: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalRentExpense: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalGrocceryExpense: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalExpenseAmount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  premium: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = User;
