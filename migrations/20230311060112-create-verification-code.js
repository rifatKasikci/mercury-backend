'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verification_codes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      is_verified: {
        type: Sequelize.BOOLEAN
      },
      code_deadline: {
        type: Sequelize.DATE
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verification_codes');
  }
};