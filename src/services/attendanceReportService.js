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
		}

		const attendanceReport = await Attendances.findAll({
			attributes: [
				'user_id',
				[Users.sequelize.fn('COUNT', Users.sequelize.col('user_id')), 'total_attendances']
			],
			include: [
				{
					model: Users,
					as: 'user',
					attributes: ['id', 'name']
				}
			],
			group: ['user.id', 'user_id'],
			order: [[Users.sequelize.literal('total_attendances'), 'DESC']],
			subQuery: false
		});

		const formattedReport = attendanceReport.map(record => ({
			id: record.user.id,
			name: record.user.name,
			total_attendances: record.dataValues.total_attendances
		}));

		return { success: true, data: formattedReport };
	}
}

module.exports = new AttendanceReportService();
