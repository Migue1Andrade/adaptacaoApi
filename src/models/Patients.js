const { Model, DataTypes } = require('sequelize');

class Patients extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			cpf: DataTypes.STRING,
			company_id: DataTypes.STRING,
			born: DataTypes.DATE,
			is_deleted: DataTypes.BOOLEAN
		},{
			sequelize: connection,
			tableName: 'patients',
			modelName: 'Patients',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		});
	}
	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
		this.hasMany(models.Attendances, { foreignKey: 'patient_id', as: 'attendances' });
	}
}

module.exports = Patients;