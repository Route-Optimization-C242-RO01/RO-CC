'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Token_users', 'expires_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: () => new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Token_users', 'expires_at');
  }
};
