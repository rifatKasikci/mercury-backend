'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trade_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message_id: {
        type: Sequelize.STRING
      },
      is_confirmed: {
        type: Sequelize.BOOLEAN
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      advert_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'adverts',
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
    await queryInterface.dropTable('trade_products');
  }
};