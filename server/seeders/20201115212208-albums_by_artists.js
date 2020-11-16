'use strict';
const albumsByArtists = require('./seedFiles/albumsByArtists')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('albums_by_artists', albumsByArtists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('albums_by_artists', null, {});
  },
};
