const Users = require('../../models/Users');
const Attendances = require('../../models/Attendances');

module.exports = {
	async getAttendanceReport(req, res) {
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

			return res.status(200).json(formattedReport);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao obter o relatório de atendimentos.' });
		}
	}
};
