'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Song, {
        through: 'songs_by_artists',
        foreignKey: 'artistId'
      });
      this.belongsToMany(models.Album, {
        through: 'albums_by_artists',
        foreignKey: 'artistId'
      });
    }
  };
  Artist.init({
    artistName: DataTypes.STRING,
    artistCoverImg: DataTypes.TEXT,
    uploadAt: {type: DataTypes.DATE, defaultValue:sequelize.NOW}
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};