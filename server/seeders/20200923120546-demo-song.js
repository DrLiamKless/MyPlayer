'use strict';

const date = new Date(Date.now());
const dateToShow = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('songs', [{
    youtubeLink: "example link",
    albumId: 1,
    artistId: 1,
    songName: 'example song',
    length: "00:03:21" ,
    createdAt: dateToShow ,
    updatedAt: dateToShow 
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('songs', null, {});
  }
};
