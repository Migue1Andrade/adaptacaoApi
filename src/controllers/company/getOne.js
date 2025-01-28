const Company = require('../../models/Companies.js');

module.exports = {
	async index(req, res) {
		try {
			const { company_id  } = req.params;
			console.log("🚀 ~ findCompanyById ~ company_id:", company_id)

			if (!company_id) {
				return res.status(400).json({ error: 'O ID da clínica é obrigatório.' });
			}

			const company = await Company.findByPk(company_id);

			if (!company) {
				return res.status(404).json({ error: 'Clínica não encontrada.' });
			}

			return res.status(200).json(company);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'Erro ao buscar a clínica. Por favor, tente novamente mais tarde.' });
		}
	}
};
