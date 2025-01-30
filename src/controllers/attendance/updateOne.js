const moment = require('moment');
const Attendances = require('../../models/Attendances.js');

module.exports = {
	async update(req, res) {
		try {
			const updateData = {};
			const { id } = req.params;
			let {
				user_id,
				company_id,
				start_date,
				end_date,
				patient_id,
				place_id,
			} = req.body;

			if (!id) return res.status(400).json({ message: 'O ID do atendimento é obrigatório.' });

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return res.status(404).json({ message: 'Atendimento não encontrado.' });

			if (start_date) updateData.start_date = moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			if (end_date) updateData.end_date = moment(end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			if (user_id !== undefined) updateData.user_id = user_id;
			if (company_id !== undefined) updateData.company_id = company_id;
			if (patient_id !== undefined) updateData.patient_id = patient_id;
			if (place_id !== undefined) updateData.place_id = place_id;

			if (Object.keys(updateData).length === 0) return res.status(400).json({ message: 'Nenhum campo válido foi enviado para atualização.' });

			const [rowsUpdated, [updatedAttendance]] = await Attendances.update(updateData, {
				where: { id: id },
				returning: true,
			});

			if (rowsUpdated === 0) return res.status(400).json({ message: 'Nenhuma atualização foi realizada.' });

			return res.status(200).json({
				message: 'Atendimento atualizado com sucesso.',
				data: updatedAttendance,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao atualizar o atendimento. Por favor, tente novamente mais tarde.' });
		}
	}
};
