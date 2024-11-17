'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Destinations', [
      {
        id_destination:'87648387-3cdc-4d77-8b27-6cbc2bfd07fa',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832'
      },
      {
        id_destination:'1b05ce3b-a188-4036-8613-3d96285f7a03',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832'
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Destinations', null, {});
  }
};
