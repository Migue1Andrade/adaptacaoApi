'use strict';

/** @type {import('sequelize-cli').Migration} */
	
module.exports = {
	async up (queryInterface, Sequelize) {

		const transaction = await queryInterface.sequelize.transaction();

		try {
		await queryInterface.createTable('attendances', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			company_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'companies',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			start_date: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			},
			end_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			patient_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'patients',
					key: 'id'
				},
			},
			place_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'places',
					key: 'id'
				},
			},
			finished: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			confirmed_by: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			confirmed_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
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
			await queryInterface.dropTable('attendances');
		} catch (e) {
			console.log(e);
			await transaction.rollback();
		}
	}
};
