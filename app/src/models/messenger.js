'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Group, User}) {
      this.belongsTo(User, {foreignKey: "user_id", as: "from"});
      this.belongsTo(Group, {foreignKey: "group_id", as : "to" });
    }
  }
  Messenger.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Messenger',
  });
  return Messenger;
};