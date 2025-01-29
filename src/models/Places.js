const { Model, DataTypes } = require('sequelize');

class Places extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			company_id: DataTypes.STRING,
            is_deleted: DataTypes.BOOLEAN
		},{
			sequelize: connection,
			tableName: 'places',
			modelName: 'Places',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		});
	}
	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
		this.hasMany(models.Attendances, { foreignKey: 'place_id', as: 'attendances' });
	}
}

 module.exports = Places;