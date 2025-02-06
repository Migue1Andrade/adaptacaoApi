const DashboardService = require('../services/dashboardService');

module.exports = {
	async getDashboard(req, res) {
		const result = await DashboardService.getDashboardData(req.query);

		if (!result.success) {
			return res.status(500).json({ error: result.error });
		}

		return res.status(200).json({
			message: 'Dados do dashboard obtidos com sucesso.',
			data: result.data
		});
	}
};
