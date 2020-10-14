'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class songs_in_playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  songs_in_playlists.init({
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'songs_in_playlists',
  });
  return songs_in_playlists;
};