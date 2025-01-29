const Patients = require('../../models/Patients.js');
const { Op } = require('sequelize');

module.exports = {
	async list(req, res) {
		try {
			const { name, cpf, page = 1, limit = 10 } = req.query;

			const filters = {};
			if (name) filters.name = { [Op.iLike]: `%${name}%` };
			if (cpf) filters.cpf = cpf;

			const offset = (page - 1) * limit;

			const { count, rows: patients } = await Patients.findAndCountAll({
				where: filters,
				limit,
				offset
			});

			return res.status(200).json({
				total: count,
				page: parseInt(page),
				limit: parseInt(limit),
				patients
			});
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	}
};
