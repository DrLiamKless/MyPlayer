'use strict';
const interactions = require('./seedFiles/interactions')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('interactions', interactions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('interactions', null, {});
  },
};
