/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:'users',
          key:'id'
        }
      },
      role_id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:'roles',
          key:'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_roles');
  }
};