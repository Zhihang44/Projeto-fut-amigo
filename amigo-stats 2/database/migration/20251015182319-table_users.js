'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true
        }
      }, 
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user'
      },
      last_login: {
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};