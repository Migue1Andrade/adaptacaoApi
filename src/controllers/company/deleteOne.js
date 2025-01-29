const Company = require('../../models/Companies.js');

module.exports = {
	async delete(req, res) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ message: 'O ID da companhia é obrigatório.' });
			}

			const company = await Company.findByPk(id);

			if (!company) {
				return res.status(404).json({ message: 'Companhia não encontrada.' });
			}

			await Company.update({ is_deleted: true }, {
				where: { id: id },
			});

			return res.status(200).json({ message: 'Companhia excluída com sucesso.' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao excluir a companhia. Por favor, tente novamente mais tarde.' });
		}
	},
};
