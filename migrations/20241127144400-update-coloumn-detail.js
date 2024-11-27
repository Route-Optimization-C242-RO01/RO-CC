'use strict';

module.exports = {
  /**
   * Run the migration to modify the table.
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    // Hapus kolom 'kg'
    await queryInterface.removeColumn('Detail_routes', 'kg');

    // Ubah tipe data kolom 'demand' menjadi DECIMAL(10, 2)
    await queryInterface.changeColumn('Detail_routes', 'demand', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
  },

  /**
   * Revert the migration by restoring the 'kg' column and the previous type of 'demand'.
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async down(queryInterface, Sequelize) {
    // Tambahkan kembali kolom 'kg'
    await queryInterface.addColumn('Detail_routes', 'kg', {
      type: Sequelize.DECIMAL(10, 5),
      allowNull: true
    });

    // Ubah tipe data kolom 'demand' kembali ke INTEGER(3)
    await queryInterface.changeColumn('Detail_routes', 'demand', {
      type: Sequelize.INTEGER(3),
      allowNull: false
    });
  }
};
