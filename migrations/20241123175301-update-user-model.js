'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Mengubah struktur tabel Users
    await queryInterface.changeColumn('Users', 'id_user', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });

    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING(50),
      allowNull: false, 
    });

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING(256),
      allowNull: false, 
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    // Mengembalikan perubahan pada tabel Users jika rollback
    await queryInterface.changeColumn('Users', 'id_user', {
      type: Sequelize.UUID,
      allowNull: true, 
    });

    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING(50),
      allowNull: true,
    });

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING(256),
      allowNull: true,
    });
  }
};
