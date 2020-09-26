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
    static associate(models) {
      this.hasMany(models.Interaction, {
        foreignKey: 'userId'
      });
      this.belongsToMany(models.Playlist, {
        through: 'user_playlists',
        foreignKey: 'userId'
      });
    }
  };
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    preferneces: DataTypes.STRING,
    rememberToken: DataTypes.BOOLEAN,
    uploadAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};