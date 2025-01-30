const Attendances = require('../../models/Attendances');

module.exports = {
    async index(req, res) {
        try {
			const { id } = req.params;

			if (!id) return res.status(400).json({ error: 'O ID do atendimento é obrigatório.' });

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return res.status(404).json({ error: 'atendimento não encontrada.' });

			return res.status(200).json(attendance);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'Erro ao buscar atendimento. Por favor, tente novamente mais tarde.' });
		}
    }
}
