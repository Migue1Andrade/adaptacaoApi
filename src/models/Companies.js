const { Model, DataTypes } = require('sequelize');

class Company extends Model {
	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			address_line: DataTypes.STRING,
			address_neighbourhood: DataTypes.STRING,
			address_city: DataTypes.STRING,
			address_state: DataTypes.STRING,
			is_deleted: DataTypes.BOOLEAN
		},{
			sequelize: connection,
			tableName: 'companies',
			modelName: 'Company',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		});
	}
    static associate(models) {
        
    }
}

module.exports = Company;