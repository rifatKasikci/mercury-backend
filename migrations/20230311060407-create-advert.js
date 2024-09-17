'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adverts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      completion_time_of_requested_service: {
        type: Sequelize.INTEGER
      },
      completion_time_of_provided_service: {
        type: Sequelize.INTEGER
      },
      min_revision_count: {
        type: Sequelize.INTEGER
      },
      max_revision_count: {
        type: Sequelize.INTEGER
      },
      revision_count_of_provided_service: {
        type: Sequelize.INTEGER
      },
      revision_count_of_requested_service: {
        type: Sequelize.INTEGER
      },
      is_matched_user_confirmed: {
        type: Sequelize.BOOLEAN
      },
      is_requested_service_sended: {
        type: Sequelize.BOOLEAN
      },
      is_provided_service_sended: {
        type: Sequelize.BOOLEAN
      },
      trade_status: {
        type: Sequelize.STRING
      },
      requested_service_by_advertiser:{
        type:Sequelize.INTEGER,
        references:{
          model:'categories',
          key:'id'
        }
      },
      provided_service_by_advertiser:{
        type:Sequelize.INTEGER,
        references:{
          model:'categories',
          key:'id'
        }
      },
      matched_user_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
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
    await queryInterface.dropTable('adverts');
  }
};