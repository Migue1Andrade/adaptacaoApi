const CompanyService = require('../services/companyService');

module.exports = {
	async createCompany(req, res) {
		try {
			const result = await CompanyService.createCompany(req.body);

			return res.status(201).json(result.company);
		} catch (error) {
			console.error(error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	},

	async deleteCompany(req, res) {
		try {
			const { id } = req.params;
			const result = await CompanyService.deleteCompany(id);

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error(error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	},

	async getCompanyById(req, res) {
		try {
			const { id } = req.params;
			const result = await CompanyService.getCompanyById(id);

			return res.status(200).json(result.company);
		} catch (error) {
			console.error(error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	},

	async updateCompany(req, res) {
		try {
			const { id } = req.params;
			const result = await CompanyService.updateCompany(id, req.body);

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error(error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	}
};
