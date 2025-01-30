const Attendances = require('../../../models/Attendances');
const moment = require('moment');

module.exports = {

	async update(req, res) {
		try {
			const { id } = req.params;
			let { confirmed_at, confirmed_by } = req.body;

			if (!id) return res.status(400).json({ message: 'O ID do atendimento é obrigatório.' });

			if (!confirmed_at || !confirmed_by) return res.status(400).json({ message:'Os campos confirmed_at e confirmed_by são obrigatórios.' });

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return res.status(404).json({ message: 'Atendimento não encontrado.' });

			const updateData = {
				confirmed_at: moment(confirmed_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
				confirmed_by
			};

			const [rowsUpdated, [updatedAttendance]] = await Attendances.update(updateData, {
				where: { id: id },
				returning: true,
			});

			if (rowsUpdated === 0) return res.status(400).json({ message: 'Nenhuma confirmação foi realizada.' });

			return res.status(200).json({
				message: 'Atendimento confirmado com sucesso.',
				data: updatedAttendance,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao confirmar o atendimento. Por favor, tente novamente mais tarde.' });
		}
	}
};
