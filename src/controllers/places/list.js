const Places = require('../../models/Places.js');
const { Op } = require('sequelize');

module.exports = {
	async list(req, res) {
		try {
			const { name, page = 1, limit = 10 } = req.query;

			const filters = {};
			if (name) filters.name = { [Op.iLike]: `%${name}%` };

			const offset = (page - 1) * limit;

			const { count, rows: places } = await Places.findAndCountAll({
				where: filters,
				limit,
				offset
			});

			return res.status(200).json({
				total: count,
				page: parseInt(page),
				limit: parseInt(limit),
				places
			});
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}
};
