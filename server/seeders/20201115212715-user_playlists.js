'use strict';
const userPlaylists = require('./seedFiles/userPlaylists')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_playlists', userPlaylists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_playlists', null, {});
  },
};
