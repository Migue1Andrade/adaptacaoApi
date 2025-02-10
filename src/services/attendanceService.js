const moment = require('moment');
const Attendances = require('../models/Attendances');

const updateAttendanceData = (data) => {
	const updateData = {};

	if (data.start_date) updateData.start_date = data.start_date;
	if (data.end_date) updateData.end_date = data.end_date;
	if (data.user_id !== undefined) updateData.user_id = data.user_id;
	if (data.company_id !== undefined) updateData.company_id = data.company_id;
	if (data.patient_id !== undefined) updateData.patient_id = data.patient_id;
	if (data.place_id !== undefined) updateData.place_id = data.place_id;

	return updateData;
};

class AttendanceService {
	async createAttendance(data) {
		const { user_id, company_id, start_date, end_date, patient_id, place_id } = data;

		const attendance = await Attendances.create({
			user_id,
			company_id,
			start_date,
			end_date,
			patient_id,
			place_id,
			confirmed_by: null,
			confirmed_at: null
		});

		return { success: true, attendance };
	};

	async deleteAttendance(id) {
		if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

		const attendance = await Attendances.findByPk(id);

		if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

		await Attendances.update({ is_deleted: true }, { where: { id } });

		return { success: true, message: 'Atendimento excluído com sucesso.' };
	};

	async getAttendanceById(id) {
		if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

		const attendance = await Attendances.findByPk(id);

		if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

		return { success: true, attendance };
	};

	async updateAttendance(id, data) {
		if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

		const attendance = await Attendances.findByPk(id);

		if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };
		
		const updateData = updateAttendanceData(data);

		if (Object.keys(updateData).length === 0) return { success: false, error: 'Nenhum campo válido foi enviado para atualização.' };

		const [rowsUpdated] = await Attendances.update(updateData, {
			where: { id }
		});

		if (rowsUpdated === 0) return { success: false, error: 'Nenhuma atualização foi realizada.' };

		return { success: true, message: 'Atendimento atualizado com sucesso.' };
	};

	async confirmAttendance(id, data) {
		if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

		const { confirmed_at, confirmed_by } = data;

		if (!confirmed_at || !confirmed_by) return { success: false, error: 'Os campos confirmed_at e confirmed_by são obrigatórios.' };

		const attendance = await Attendances.findByPk(id);

		if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

		const updateData = {
			confirmed_at: moment(confirmed_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
			confirmed_by
		};

		const [rowsUpdated] = await Attendances.update(updateData, { where: { id } });

		if (rowsUpdated === 0) return { success: false, error: 'Nenhuma confirmação foi realizada.' };

		return { success: true, message: 'Atendimento confirmado com sucesso.' };
	};

	async finishAttendance(id) {
		if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

		const attendance = await Attendances.findByPk(id);

		if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

		await Attendances.update({ finished: true }, { where: { id } });

		return { success: true, message: 'Atendimento concluído com sucesso.' };
	};
}

module.exports = new AttendanceService();
