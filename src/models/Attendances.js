const { Model, DataTypes } = require('sequelize');

class Attendances extends Model {
	static init(connection) {
		super.init({
			start_date: DataTypes.DATE,
			end_date: DataTypes.DATE,
			finished: DataTypes.BOOLEAN,
			confirmed_at: DataTypes.DATE,
			is_deleted: DataTypes.BOOLEAN
		},{
			sequelize: connection,
			tableName: 'attendances',
			modelName: 'Attendances',
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		});
	}
	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
		this.belongsTo(models.Patients, { foreignKey: 'patient_id', as: 'patient' });
		this.belongsTo(models.Places, { foreignKey: 'place_id', as: 'place' });
		this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.Users, { foreignKey: 'confirmed_by', as: 'confirmedUser' });
	}
}

module.exports = Attendances;
