const AttendanceReportService = require('../services/attendanceReportService');

module.exports = {
	async getAttendanceReport(req, res) {
		try {
			const result = await AttendanceReportService.getAttendanceReport(req);

			return res.status(200).json(result.data);
		} catch (e) {
			console.log(e);
			
			return res.status(500).json({ message: 'erro interno' });
		};
	}
};
