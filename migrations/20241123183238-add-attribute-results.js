'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Results', 'id_user', {
      type: Sequelize.UUID,  
      allowNull: false,            
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Results', 'id_user');
  }
};
