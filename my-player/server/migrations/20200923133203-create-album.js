'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      artist_id: {
        type: Sequelize.INTEGER,
      },
      album_name: {
        type: Sequelize.STRING,
      },
      album_cover_img: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      upload_at: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_DATE'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Albums');
  }
};