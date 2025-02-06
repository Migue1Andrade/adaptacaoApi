const AttendanceService = require('../services/attendanceService.js');

module.exports = {
	async store(req, res) {
		try {
			const result = await AttendanceService.createAttendance(req.body);

			if (!result.success) return res.status(500).json({ error: result.error });

			return res.status(201).json(result.attendance);
		} catch (error) {
			console.error("Erro na store:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async delete(req, res) {
		try {
			const { id } = req.params;
			const result = await AttendanceService.deleteAttendance(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro na delete:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async index(req, res) {
		try {
			const { id } = req.params;
			const result = await AttendanceService.getAttendanceById(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json(result.attendance);
		} catch (error) {
			console.error("Erro na index:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async update(req, res) {
		try {
			const { id } = req.params;
			const result = await AttendanceService.updateAttendance(id, req.body);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro na update:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async confirm(req, res) {
		try {
			const { id } = req.params;
			const result = await AttendanceService.confirmAttendance(id, req.body);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro na confirm:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	},

	async finish(req, res) {
		try {
			const { id } = req.params;
			const result = await AttendanceService.finishAttendance(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error("Erro ao finalizar atendimento:", error);

			return res.status(500).json({ error: "Erro interno no servidor." });
		}
	}
};
