const Patients = require('../../models/Patients.js');

module.exports = {
	async store(req, res) {
		const { name, born, cpf, company_id } = req.body;

		try {
			const patient = await Patients.create({
				name,
				born,
				cpf,
				company_id
			});

			return res.status(200).json(patient);
		}catch(e) {
			console.log(e);

			return res.status(450).json({ message: 'erro ao criar paciente' });
		}

	}
}
