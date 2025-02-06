const { Op } = require('sequelize');
const moment = require('moment');
const Attendances = require('../models/Attendances');
const Patients = require('../models/Patients');

class DashboardService {
	async getDashboardData(query) {
		try {
			const { start_date, end_date } = query;

			const formattedStartDate = moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			const formattedEndDate = moment(end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

			const attendances = await Attendances.findAll({
				where: {
					[Op.or]: [
						{ start_date: { [Op.between]: [formattedStartDate, formattedEndDate] } },
						{ end_date: { [Op.between]: [formattedStartDate, formattedEndDate] } }
					]
				}
			});

			const totalAttendances = attendances.length;

			const totalPatients = await Patients.count({
				where: {
					created_at: {
						[Op.between]: [formattedStartDate, formattedEndDate]
					}
				}
			});

			return {
				success: true,
				data: {
					totalAttendances,
					totalPatients,
					attendances
				}
			};
		} catch (error) {
			console.error("Erro ao obter os dados do dashboard:", error);
			return { success: false, error: 'Erro ao obter os dados do dashboard.' };
		}
	}
}

module.exports = new DashboardService();
