'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Detail_routes', 'kg', {
      type: Sequelize.DECIMAL(10,5),
      allowNull: true
    });

    await queryInterface.changeColumn('Detail_routes', 'postal_code', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Detail_routes', 'kg', {
      type: DataTypes.DECIMAL(10,5),
      allowNull: false
    });

    await queryInterface.changeColumn('Detail_routes', 'postal_code', {
      type: Sequelize.STRING(20),
      allowNull: false
    });
  }
};