'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Token_users', 'id_user', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id_user', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('Results', 'id_user', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id_user'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.changeColumn('Routes', 'id_results', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Results',
        key: 'id_results'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.changeColumn('Detail_routes', 'id_route', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Routes',
        key: 'id_route'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Token_users', 'id_user', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn('Results', 'id_user', {
      type: Sequelize.UUID,
      allowNull: false,
    })

    await queryInterface.changeColumn('Routes', 'id_results', {
      type: Sequelize.UUID,
      allowNull: false,
    })

    await queryInterface.changeColumn('Detail_routes', 'id_route', {
      type: Sequelize.UUID,
      allowNull: false,
    })
  }
};