const { Model, DataTypes } = require('sequelize');

class Attendances extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.STRING,
			company_id: DataTypes.STRING,
			start_date: DataTypes.STRING,
			end_date: DataTypes.STRING,
			patient_id: DataTypes.STRING,
			place_id: DataTypes.STRING,
			finished: DataTypes.BOOLEAN,
			confirmed_by: DataTypes.INTEGER,
			confirmed_at: DataTypes.DATE,
            is_deleted: DataTypes.BOOLEAN
		},{
			sequelize: connection,
			tableName: 'attendances',
			modelName: 'Attendances',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
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
