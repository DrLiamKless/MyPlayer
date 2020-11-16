const { Interaction } = require('../models');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */S

    static associate(models) {
      this.belongsToMany(models.Artist, {
        through: 'albums_by_artists',
        foreignKey: 'artistId'
      });
      this.hasMany(models.Song, {
        foreignKey: 'albumId'
      });
    }
  };
  Album.init({
    artistId: DataTypes.INTEGER,
    albumName: DataTypes.STRING,
    albumCoverImg: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    uploadAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};