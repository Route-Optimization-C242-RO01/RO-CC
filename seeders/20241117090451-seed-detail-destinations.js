'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detail_destinations', [
      {
        id_detail_destination:'427a8108-000d-4f25-9f32-9319b3ae3463',
        id_destination: '87648387-3cdc-4d77-8b27-6cbc2bfd07fa',
        street: 'Jl.Ampang',
        city: 'Padang',
        province: 'Sumatera Barat',
        postal_code: '25139',
        kg: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        id_detail_destination:'a4d663ed-80f3-4c21-9f0a-ddfa1b5f0de9',
        id_destination: '1b05ce3b-a188-4036-8613-3d96285f7a03',
        street: 'Jl.Ampang',
        city: 'Padang',
        province: 'Sumatera Barat',
        postal_code: '25139',
        kg: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detail_destinations', null, {});
  }
};
