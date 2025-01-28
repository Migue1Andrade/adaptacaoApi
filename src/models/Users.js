const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(connection) {
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			cpf: DataTypes.INTEGER,
			phone: DataTypes.INTEGER,
			type: DataTypes.STRING,
			root: DataTypes.BOOLEAN,
            company_id: DataTypes.INTEGER
		},{
			sequelize: connection,
			tableName: 'users',
			modelName: 'Users',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		});
	}
    static associate(models) {
        this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
        this.hasMany(models.Attendances, { foreignKey: 'user_id', as: 'attendances' });
    }
}

module.exports = Users;