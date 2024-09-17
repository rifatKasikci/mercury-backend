'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('roles', [{
      name:'User',
      created_at: new Date(),
      updated_at: new Date()
    },{
      name:'Admin',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
