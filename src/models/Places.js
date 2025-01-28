const { Model, DataTypes } = require('sequelize');

class Places extends Model {
    static init(connection) {
		super.init({
			name: DataTypes.STRING,
			company_id: DataTypes.STRING
		},{
			sequelize: connection,
			tableName: 'places',
			modelName: 'Places',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		});
	}
    static associate(models) {
        
    }
}