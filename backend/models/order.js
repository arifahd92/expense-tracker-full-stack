const {DataTypes} = require ('sequelize');
const sequelize = require ('../db/connection');

const Order = sequelize.define ('order', {
  orderid: {
    type: DataTypes.STRING,
  },
  status: DataTypes.STRING,
  paymentid: DataTypes.STRING,
});
module.exports = Order;
