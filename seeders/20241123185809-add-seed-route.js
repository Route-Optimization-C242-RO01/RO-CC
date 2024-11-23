'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Routes', [
      {
        id_results: 'c42030a7-4df9-4478-93a8-a004c623b297',
        id_route: 'da4b44f3-e9aa-4480-930a-1e93214bc1e2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: 'c42030a7-4df9-4478-93a8-a004c623b297',
        id_route: 'f898b0b2-6eab-4192-a572-65607ba8fa4a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: '1566324a-58e3-42ea-bb07-b0a855c621e2',
        id_route: '0558b9c2-e175-47bf-8ad7-719ed707e913',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: '1566324a-58e3-42ea-bb07-b0a855c621e2',
        id_route: 'fbb04540-b6b5-41d4-ac70-ddada7b1b414',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: 'a44b047d-e691-496a-8451-f4cc657a8fee',
        id_route: '6ecd4eb5-c88f-4c01-9e22-2f54a9045058',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: 'a44b047d-e691-496a-8451-f4cc657a8fee',
        id_route: '3b4caadc-7a2e-46f0-bd3b-d47ce346bcba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: '8eccd67c-734f-4ab6-9e01-642cb09b4080',
        id_route: 'b62bad61-2a34-4b44-9c24-aca63d2770d3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_results: '8eccd67c-734f-4ab6-9e01-642cb09b4080',
        id_route: '942e5fff-1e95-4d2c-8838-6ebe8525972e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Routes', null, {});
  }
};