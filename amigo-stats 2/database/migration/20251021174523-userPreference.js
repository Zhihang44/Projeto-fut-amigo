'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('userPreference', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			emailNotifications: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			twoFactorAuth: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			theme: {
				type: Sequelize.ENUM('light', 'dark', 'system'),
				defaultValue: 'light'
			},
			language: {
				type: Sequelize.STRING,
				defaultValue: 'pt-BR'
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('userPreference');
	},
};