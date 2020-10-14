'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albums_by_artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  albums_by_artists.init({
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'albums_by_artists',
  });
  return albums_by_artists;
};