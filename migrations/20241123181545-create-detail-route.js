'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detail_routes', {
      id_detail_route: {
        type: Sequelize.UUID,
        primaryKey:true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      id_route: {
        type: Sequelize.UUID,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      province: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      kg: {
        type: Sequelize.DECIMAL(10,5),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: false
      },
      latitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Detail_routes');
  }
};