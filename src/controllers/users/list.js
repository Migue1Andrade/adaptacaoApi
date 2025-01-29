const Users = require('../../models/Users.js');
const { Op } = require('sequelize');

module.exports = {
	async list(req, res) {
		try {
			const { name, type, page = 1, limit = 10 } = req.query;
			const filters = { is_deleted: false };

			if (name) filters.name = { [Op.iLike]: `%${name}%` };
			if (type) filters.type = type;

			const offset = (page - 1) * limit;

			const { count, rows: users } = await Users.findAndCountAll({
				where: filters,
				limit,
				offset
			});

			return res.status(200).json({
				total: count,
				page: parseInt(page),
				limit: parseInt(limit),
				users
			});
		} catch (error) {
			console.log("🚀 ~ index ~ error:", error);

			return res.status(500).json({ error: 'Internal server error' });
		}
	}
};