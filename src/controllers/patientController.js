const PatientService = require('../services/patientService');

module.exports = {
	async store(req, res) {
		try {
			const result = await PatientService.createPatient(req.body);

			if (!result.success) return res.status(500).json({ error: result.error });

			return res.status(201).json(result.patient);
		} catch (error) {
			console.error("Erro no store do PatientController:", error);
			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async delete(req, res) {
		try {
			const { id } = req.params;
			const result = await PatientService.deletePatient(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro no delete do PatientController:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async index(req, res) {
		try {
			const { id } = req.params;
			const result = await PatientService.getPatientById(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json(result.patient);
		} catch (error) {
			console.error("Erro no index do PatientController:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async list(req, res) {
		try {
			const result = await PatientService.listPatients(req.query);

			if (!result.success) return res.status(500).json({ error: result.error });

			return res.status(200).json(result.data);
		} catch (error) {
			console.error("Erro no list do PatientController:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async update(req, res) {
		try {
			const { id } = req.params;
			const result = await PatientService.updatePatient(id, req.body);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message, patient: result.patient });
		} catch (error) {
			console.error("Erro no update do PatientController:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	}
};
