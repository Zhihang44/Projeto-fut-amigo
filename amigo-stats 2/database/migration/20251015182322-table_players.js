'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      club_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clubs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      nationality: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      position: {
        type: Sequelize.STRING
      },
      shirt_number: {
        type: Sequelize.INTEGER
      },
      foot: {
        type: Sequelize.ENUM('Direito', 'Esquerdo', 'Ambos'),
        defaultValue: 'Direito'
      },
      height: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('Ativo', 'Lesionado', 'Suspenso', 'Aposentado'),
        defaultValue: 'Ativo'
      },
      contract_end: {
        type: Sequelize.DATEONLY
      },
      notes: {
        type: Sequelize.TEXT
      },
      profile_image: {
        type: Sequelize.STRING
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

    // Adiciona índice para melhorar performance
    await queryInterface.addIndex('players', ['club_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};