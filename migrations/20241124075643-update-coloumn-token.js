'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Token_users', 'expires_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW 
    });
  },
  async down (queryInterface, Sequelize) {
    //rollback jadi null
    await queryInterface.addColumn('Token_users', 'expires_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null 
    });
  }
};