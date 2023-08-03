'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Group}) {
      this.belongsTo(User, {foreignKey: "user_id"});
      this.belongsTo(Group, {foreignKey: "group_id"});
    }
  }
  Groups_users.init({}, {
    sequelize,
    modelName: 'Groups_users',
  });
  return Groups_users;
};