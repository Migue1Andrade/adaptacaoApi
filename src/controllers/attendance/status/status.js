const Attendances = require('../../../models/Attendances');

module.exports = {
	async done(req, res) {
		try {
			const { id } = req.params;

			if (!id) return res.status(400).json({ message: 'O ID do atendimento é obrigatório.' });

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return res.status(404).json({ message: 'atendimento não encontrado.' });

			await Attendances.update({ finished: true }, {
				where: { id: id },
			});

			return res.status(200).json({ message: 'atendimento concluido com sucesso.' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao marcar o atendimento como concluido. Por favor, tente novamente mais tarde.' });
		}
	},
}
