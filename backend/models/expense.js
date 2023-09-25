const {DataTypes} = require ('sequelize');
const sequelize = require ('../db/connection');

const Expense = sequelize.define ('expense', {
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  catagory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Expense;
