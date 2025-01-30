const moment = require('moment');
const Attendances = require('../../models/Attendances');

module.exports = {
	async store(req, res) {
		try {
			const {
				user_id,
				company_id,
				start_date,
				end_date,
				patient_id,
				place_id,
			} = req.body;

			const formattedStartDate = moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			const formattedEndDate = moment(end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

			const attendance = await Attendances.create({
				user_id,
				company_id,
				start_date: formattedStartDate,
				end_date: formattedEndDate,
				patient_id,
				place_id,
				confirmed_by: null,
				confirmed_at: null,
			});

			return res.status(201).json(attendance);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'Erro ao criar atendimento.' });
		}
	}
};
