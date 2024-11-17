'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  //menambah kolom 'expires_at'
    await queryInterface.addColumn('Token_users', 'expires_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: () => new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
    });
  },

  async down (queryInterface, Sequelize) {
    // menghapus kolom 'expires_at' jika ada
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tableDescription = await queryInterface.describeTable('Token_users');
      if (tableDescription.expires_at) {
        await queryInterface.removeColumn('Token_users', 'expires_at', { transaction });
      }
    });
  }
};
