const Attendances = require('../../models/Attendances');

module.exports = {
	async delete(req, res) {
		try {
			const { id } = req.params;

			if (!id) return res.status(400).json({ message: 'O ID do atendimento é obrigatório.' });

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return res.status(404).json({ message: 'atendimento não encontrado.' });

			await Attendances.update({ is_deleted: true }, {
				where: { id: id },
			});

			return res.status(200).json({ message: 'atendimento excluído com sucesso.' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao excluir o atendimento. Por favor, tente novamente mais tarde.' });
		}
	},
}
