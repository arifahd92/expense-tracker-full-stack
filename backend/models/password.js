const sequelize = require ('../db/connection');
const {DataTypes} = require ('sequelize');
const {v4: uuidv4} = require ('uuid');
const ForgotPassword = sequelize.define ('ForgotPassword', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4 (),
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
});
module.exports = {ForgotPassword};
