const Company = require('../../models/Companies.js')

module.exports = {
	async update(req, res) {
		try {
			const { company_id } = req.params;

			if (!company_id) {
				return res.status(400).json({ message: 'O ID da companhia é obrigatório.' });
			}

			const company = await Company.findByPk(company_id);

			if (!company) {
				return res.status(404).json({ message: 'Companhia não encontrada.' });
			}

			const updatedCompany = await company.update(req.body);

			return res.status(200).json({ 
				message: 'Companhia atualizada com sucesso.', 
				data: updatedCompany 
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao atualizar a companhia. Por favor, tente novamente mais tarde.' });
		}
	}
}
