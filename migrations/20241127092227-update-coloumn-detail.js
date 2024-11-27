'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Detail_routes', 'demand', {
      type: Sequelize.INTEGER(3),
      allowNull: false,
    });
  },
  async down (queryInterface, Sequelize) {
    //rollback jadi null
    await queryInterface.addColumn('Detail_routes', 'demand', {
      type: Sequelize.INTEGER(3),
      allowNull: false,
    });
  }
};