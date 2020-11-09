'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Song, {
        foreignKey: 'songId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId'  
      });
    }
  };
  Interaction.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    isLiked: DataTypes.BOOLEAN,
    playCount: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Interaction',
  });
  return Interaction;
};