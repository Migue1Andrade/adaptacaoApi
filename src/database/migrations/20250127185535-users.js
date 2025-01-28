'use strict';

/** @type {import('sequelize-cli').Migration} */
	
module.exports = {
	async up (queryInterface, Sequelize) {

		const transaction = await queryInterface.sequelize.transaction();
	
		try {
			
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cpf: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            phone: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
			type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			root: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
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
		await queryInterface.dropTable('users');
	} catch (e) {
		console.log(e);
		await transaction.rollback();
	}
  }
};