'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userPreference', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Garante que cada usuário só tenha uma preferência
        references: {
          model: 'user', // Nome da tabela referenciada
          key: 'id'      // Campo referenciado
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      email_notifications: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      two_factor_auth: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      theme: {
        type: Sequelize.ENUM('light', 'dark', 'system'),
        defaultValue: 'system'
      },
      language: {
        type: Sequelize.STRING,
        defaultValue: 'pt-BR'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Adiciona um índice para melhorar a performance das consultas
    await queryInterface.addIndex('userPreference', ['user_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userPreference');
  }
};