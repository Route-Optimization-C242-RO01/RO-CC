'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832',
        name: 'superAdmin',
        password: '$2b$10$j/YZCGupXdmnoJtqMgIQv.VUXN08fcXdxlk0vY.0bZsK8bZPcSx8a', 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};