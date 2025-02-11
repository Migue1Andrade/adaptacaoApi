const Users = require('../models/Users');
const Attendances = require('../models/Attendances');

class AttendanceReportService {
	async getAttendanceReport(req) {
		const { aggregate } = req.query;

		if (!aggregate) {
			const attendanceReport = await Attendances.findAll({
				attributes: ['id', 'user_id', 'other_field'],
				include: [
					{
						model: Users,
						as: 'user',
						attributes: ['id', 'name']
					}
				]
			});

			return { success: true, data: attendanceReport };
		};

		const attendances = await Attendances.findAll({
			include: [
				{
					model: Users,
					as: 'user',
					attributes: ['id', 'name']
				}
			]
		});

		const aggregatedData = attendances.reduce((acc, attendance) => {
			const user = attendance.user;

			if (!user) return acc;

			if (!acc[user.id]) {
				acc[user.id] = {
					id: user.id,
					name: user.name,
					total_attendances: 0
				};
			};

			acc[user.id].total_attendances += 1;
			return acc;
		}, {});

		const formattedReport = Object.values(aggregatedData).sort( (a, b) => b.total_attendances - a.total_attendances );

		return { data: formattedReport };
	};
};

module.exports = new AttendanceReportService();
