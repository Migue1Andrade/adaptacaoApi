const Users = require('../models/Users');
const Attendances = require('../models/Attendances');

class AttendanceReportService {
	async getAttendanceReport() {
		try {
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
				order: [[Users.sequelize.col('total_attendances'), 'DESC']]
			});

			const formattedReport = attendanceReport.map(item => ({
				id: item.user.id,
				name: item.user.name,
				total_attendances: item.dataValues.total_attendances
			}));

			return { success: true, data: formattedReport };
		} catch (error) {
			console.error("Erro ao obter o relatório de atendimentos:", error);
			return { success: false, error: 'Erro ao obter o relatório de atendimentos.' };
		}
	}
}

module.exports = new AttendanceReportService();
