const { Op } = require('sequelize');
const moment = require('moment');
const Attendances = require('../../models/Attendances');
const Patients = require('../../models/Patients');

module.exports = {
    async getDashboard(req, res) {
        try {
            const { start_date, end_date } = req.query;

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

            return res.status(200).json({
                message: 'Dados do dashboard obtidos com sucesso.',
                data: {
                    totalAttendances,
                    totalPatients,
					attendances
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao obter os dados do dashboard.' });
        }
    }
};
