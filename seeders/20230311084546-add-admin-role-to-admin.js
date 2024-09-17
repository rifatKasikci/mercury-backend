const Role = require('../models/index').roles
const User = require('../models/index').users

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let adminRole = await Role.findOne({where:{name:'Admin'}})
    let adminUser = await User.findOne({where:{email:'admin@admin.mercury'}})

    queryInterface.bulkInsert('user_roles', [{
      user_id:adminUser.id,
      role_id:adminRole.id,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
