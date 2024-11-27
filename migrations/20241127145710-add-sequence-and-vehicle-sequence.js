'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Detail_routes', 'sequence', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    });

    await queryInterface.addColumn('Routes', 'vehicle_sequence', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Detail_route', 'sequence');

    await queryInterface.removeColumn('Route', 'vehicle_sequence');
  },
};
