'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsToMany(models.Artist, {
        through: 'songs_by_artists',
        foreignKey: 'songId'
      });
      this.belongsToMany(models.Playlist, {
        through: 'songs_in_playlists',
        foreignKey: 'songId'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });
      this.hasMany(models.Interaction, {
        foreignKey: 'songId'
      });
    }
  };
  Song.init({
    youtubeLink: DataTypes.TEXT,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    songName: DataTypes.STRING,
    length: DataTypes.STRING,
    uploadAt: {type: DataTypes.DATE, defaultValue:Date.now()}
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};