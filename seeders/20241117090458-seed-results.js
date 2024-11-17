'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Results', [
      {
        id_results: 'c42030a7-4df9-4478-93a8-a004c623b297',
        id_destination: '87648387-3cdc-4d77-8b27-6cbc2bfd07fa',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'unfinished'
      }, {
        id_results: 'a619548d-c5a8-46e8-ae6d-2181e8397a2d',
        id_destination: '1b05ce3b-a188-4036-8613-3d96285f7a03',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'finished'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Results', null, {});
  }
};
