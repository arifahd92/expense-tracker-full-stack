const Sequelize = require ('sequelize');
const sequelize = new Sequelize ('expense-tracker', 'root', '@Arif123', {
  dialect: 'mysql',
  host: 'localhost',
});
module.exports = sequelize; // default export ,
