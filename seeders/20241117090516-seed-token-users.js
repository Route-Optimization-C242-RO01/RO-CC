'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const ExpiredToken = () => {
      const now = new Date();
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    };

    await queryInterface.bulkInsert('Token_users', [{
      id_token: 'd46bdded-2f49-460a-a3fe-f4224f3fa183',
      id_user: '9b2380e9-4275-4784-b0e2-795bd2b70832',
      createdAt: new Date(),
      updatedAt: new Date(),
      expires_at: ExpiredToken()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Token_users', null, {});
  }
};
