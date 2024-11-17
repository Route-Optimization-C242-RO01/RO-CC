'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detail_results', [
      {
        id_detail_results: 'f605f472-c44d-46cd-a05b-bcfdb1434449',
        id_results: 'c42030a7-4df9-4478-93a8-a004c623b297',
        longitude: 19.590709,
        latitude: 24.342092,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id_detail_results: '5559d9e7-f726-405a-b2c7-0db9bc3297e0',
        id_results: 'a619548d-c5a8-46e8-ae6d-2181e8397a2d',
        longitude: 19.590709,
        latitude: 24.342092,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detail_results', null, {});
  }
};
