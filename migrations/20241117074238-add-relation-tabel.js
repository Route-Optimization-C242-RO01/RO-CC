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

    await queryInterface.changeColumn('Detail_destinations', 'id_destination', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Destinations', 
        key: 'id_destination', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('Detail_results', 'id_results', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Results', 
        key: 'id_results', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Destinations', 'id_user', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id_user', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('Results', 'id_destination', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Destinations', 
        key: 'id_destination', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Token_users', 'id_user', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn('Detail_destinations', 'id_destination', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn('Detail_results', 'id_results', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.removeColumn('Destinations', 'id_user');

    await queryInterface.changeColumn('Results', 'id_results', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  }
};
