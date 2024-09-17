const { hashTextWithSalt } = require('../core/utils/hashHelper')
require('dotenv').config()

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    queryInterface.bulkInsert('users', [{
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@admin.mercury',
      user_name:'admin',
      email_confirmed:true,
      password_hash:hashTextWithSalt(process.env.DEFAULT_ADMIN_PASSWORD),
      created_at: new Date(),
      updated_at: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
