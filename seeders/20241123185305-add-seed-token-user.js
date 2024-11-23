'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Results', [
      {
        id_results: 'c42030a7-4df9-4478-93a8-a004c623b297',
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832',
        title: 'Perjalanan Minggu 1',
        number_of_vehicles: 2,
        status: 'unfinished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: '1566324a-58e3-42ea-bb07-b0a855c621e2',
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832',
        title: 'Perjalanan Minggu 2',
        number_of_vehicles: 2,
        status: 'unfinished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: 'a44b047d-e691-496a-8451-f4cc657a8fee',
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832',
        title: 'Perjalanan Minggu 3',
        number_of_vehicles: 2,
        status: 'finished',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: '8eccd67c-734f-4ab6-9e01-642cb09b4080',
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832',
        title: 'Perjalanan Minggu 4',
        number_of_vehicles: 2,
        status: 'finished',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Results', null, {});
  }
};