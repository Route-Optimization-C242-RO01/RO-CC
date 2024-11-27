'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Results', 'total_distance', {
      type: Sequelize.FLOAT(10,2),
      allowNull: false,
    });
  },
  async down (queryInterface, Sequelize) {
    //rollback jadi null
    await queryInterface.addColumn('Results', 'total_distance', {
      type: Sequelize.FLOAT(10,2),
      allowNull: false,
    });
  }
};