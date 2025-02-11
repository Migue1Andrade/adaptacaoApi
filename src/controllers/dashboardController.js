const DashboardService = require('../services/dashboardService');

module.exports = {
	async getDashboard(req, res) {
		try {
			const result = await DashboardService.getDashboardData(req.query);

		return res.status(200).json({
			message: 'Dados do dashboard obtidos com sucesso.',
			data: result.data
		});
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interno' });
		};
	}
};
