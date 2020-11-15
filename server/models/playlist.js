'use strict';
const { Song, Interaction } = require('../models');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsToMany(models.Song, {
        through: 'songs_in_playlists',
        foreignKey: 'playlistId'
      });
      this.belongsToMany(models.User, {
        through: 'user_playlists',
        foreignKey: 'playlistId'
      });
    }
  };
  Playlist.init({
    playlistName: DataTypes.STRING,
    playlistCoverImg: DataTypes.TEXT,
    public: {type: DataTypes.BOOLEAN, defaultValue: false}
    }, {
    sequelize,
    underscored: true,
    modelName: 'Playlist',
  });
  return Playlist;
};