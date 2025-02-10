const CompanyService = require('../services/companyService');

module.exports = {
	async createCompany(req, res) {
		try {
			const result = await CompanyService.createCompany(req.body);

			if (!result.success) return res.status(500).json({ error: result.error });

			return res.status(201).json(result.company);
		} catch (error) {
			console.error("Erro na store:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	},

	async deleteCompany(req, res) {
		try {
			const { id } = req.params;
			const result = await CompanyService.deleteCompany(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro na delete:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	},

	async getCompanyById(req, res) {
		try {
			const { id } = req.params;
			const result = await CompanyService.getCompanyById(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json(result.company);
		} catch (error) {
			console.error("Erro na index:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	},

	async updateCompany(req, res) {
		try {
			const { id } = req.params;
			const result = await CompanyService.updateCompany(id, req.body);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro na update:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		};
	}
};
