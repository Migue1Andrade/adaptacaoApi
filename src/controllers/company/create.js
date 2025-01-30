const Company = require('../../models/Companies.js');

module.exports = {
	async store(req, res) {
		try {
			const {
				name,
				email,
				address_line,
				address_neighbourhood,
				address_city,
				address_state
			} = req.body;

			const company = await Company.create({
				name,
				email,
				address_line,
				address_neighbourhood,
				address_city,
				address_state
			});

			return res.status(201).json(company);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'Erro ao criar a clínica. Por favor, tente novamente mais tarde.' });
		}
	}
};
