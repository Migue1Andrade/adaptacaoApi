require('dotenv').config();

module.exports = {
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	define: {
		timestamps: true,
		undescored: true,
	}
};