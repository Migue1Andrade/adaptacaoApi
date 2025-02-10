'use strict';

/** @type {import('sequelize-cli').Migration} */
	
module.exports = {
	async up (queryInterface, Sequelize) {

		const transaction = await queryInterface.sequelize.transaction();

		try {
		await queryInterface.createTable('companies', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			address_line: {
				type: Sequelize.STRING,
				allowNull: false
			},
			address_neighbourhood: {
				type: Sequelize.STRING,
				allowNull: false
			},
			address_city: {
				type: Sequelize.STRING,
				allowNull: false
			},
			address_state: {
				type: Sequelize.STRING,
				allowNull: false
			},
			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			}
		}, { transaction });

		await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			throw error;
		}
	},

	async down (queryInterface) {

	const transaction = queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('companies');
		} catch (error) {
			console.log("🚀 ~ down ~ error:", error)

			await transaction.rollback();
		}
	}
};
