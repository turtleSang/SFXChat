'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Groups_users, Messenger}) {
      // define association here
      this.hasMany(Groups_users, {foreignKey: "user_id"});
      this.hasMany(Messenger, {foreignKey: "user_id", as: "from"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    phonenumber: {
      type: DataTypes.STRING,
      validate:{
        isNumeric: true
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};