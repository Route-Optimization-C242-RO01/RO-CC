'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Detail_routes', 'latitude', {
      type: Sequelize.DECIMAL(9, 6),
      allowNull: false,
    });

    await queryInterface.changeColumn('Detail_routes', 'longitude', {
      type: Sequelize.DECIMAL(9, 6),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Detail_routes', 'latitude', {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false
    });

    await queryInterface.changeColumn('Detail_routes', 'longitude', {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false
    });
  },
};
