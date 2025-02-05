const PatientService = require('../services/patientService');

module.exports = {
	async store(req, res) {
		const result = await PatientService.createPatient(req.body);

		if (!result.success) {
			return res.status(500).json({ error: result.error });
		}

		return res.status(201).json(result.patient);
	},

	async delete(req, res) {
		const { id } = req.params;
		const result = await PatientService.deletePatient(id);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json({ message: result.message });
	},

	async index(req, res) {
		const { id } = req.params;
		const result = await PatientService.getPatientById(id);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json(result.patient);
	},

	async list(req, res) {
		const result = await PatientService.listPatients(req.query);

		if (!result.success) {
			return res.status(500).json({ error: result.error });
		}

		return res.status(200).json(result.data);
	},

	async update(req, res) {
		const { id } = req.params;
		const result = await PatientService.updatePatient(id, req.body);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json({ message: result.message, patient: result.patient });
	}
};
