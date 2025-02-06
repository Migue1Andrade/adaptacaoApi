const AttendanceReportService = require('../services/attendanceReportService');

module.exports = {
	async getAttendanceReport(req, res) {
		const result = await AttendanceReportService.getAttendanceReport();

		if (!result.success) {
			return res.status(500).json({ message: result.error });
		}

		return res.status(200).json(result.data);
	}
};
