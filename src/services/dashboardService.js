const { Op } = require('sequelize');
const moment = require('moment');
const Attendances = require('../models/Attendances');
const Patients = require('../models/Patients');

class DashboardService {
	async getDashboardData(query) {
		const { start_date, end_date } = query;
		const formattedStartDate = moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
		const formattedEndDate = moment(end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

		const attendances = await Attendances.findAll({
			where: {
				start_date: {[Op.gte]: formattedStartDate },
				end_date: { [Op.lte]: formattedEndDate }
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
	};
};

module.exports = new DashboardService();
