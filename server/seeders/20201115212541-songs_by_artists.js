'use strict';
const songsByArtists = require('./seedFiles/songsByArtists')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('songs_by_artists', songsByArtists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('songs_by_artists', null, {});
  },
};
