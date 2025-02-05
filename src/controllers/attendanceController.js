const AttendanceService = require('../services/attendanceService.js');

module.exports = {
	async store(req, res) {
		const result = await AttendanceService.createAttendance(req.body);

		if (!result.success) return res.status(500).json({ error: result.error });
		
		return res.status(201).json(result.attendance);
	},

	async delete(req, res) {
		const { id } = req.params;
		const result = await AttendanceService.deleteAttendance(id);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json({ message: result.message });
	},

	async index(req, res) {
		const { id } = req.params;
		const result = await AttendanceService.getAttendanceById(id);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json(result.attendance);
	},

	async update(req, res) {
		const { id } = req.params;
		const result = await AttendanceService.updateAttendance(id, req.body);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json({ message: result.message });
	},

	async confirm(req, res) {
		const { id } = req.params;
		const result = await AttendanceService.confirmAttendance(id, req.body);
	
		if (!result.success) return res.status(400).json({ error: result.error });
	
		return res.status(200).json({ message: result.message });
	},

	async finish(req, res) {
		const { id } = req.params;
		const result = await AttendanceService.finishAttendance(id);
	
		if (!result.success) return res.status(400).json({ error: result.error });
		
		return res.status(200).json({ message: result.message });
	}
	
	
};
