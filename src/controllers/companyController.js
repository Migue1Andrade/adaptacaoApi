const CompanyService = require('../services/companyService');

module.exports = {
	async store(req, res) {
		const result = await CompanyService.createCompany(req.body);

		if (!result.success) return res.status(500).json({ error: result.error });

		return res.status(201).json(result.company);
	},

	async delete(req, res) {
		const { id } = req.params;
		const result = await CompanyService.deleteCompany(id);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json({ message: result.message });
	},

	async index(req, res) {
		const { id } = req.params;
		const result = await CompanyService.getCompanyById(id);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json(result.company);
	},

	async update(req, res) {
		const { id } = req.params;
		const result = await CompanyService.updateCompany(id, req.body);

		if (!result.success) return res.status(400).json({ error: result.error });
		
		return res.status(200).json({ message: result.message });
	}
};
