const moment = require('moment');
const Attendances = require('../../models/Attendances');

class AttendanceService {
	async createAttendance(data) {
		try {
			const {
				user_id,
				company_id,
				start_date,
				end_date,
				patient_id,
				place_id,
			} = data;

			const formattedStartDate = moment(start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			const formattedEndDate = moment(end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

			const attendance = await Attendances.create({
				user_id,
				company_id,
				start_date: formattedStartDate,
				end_date: formattedEndDate,
				patient_id,
				place_id,
				confirmed_by: null,
				confirmed_at: null,
			});

			return { success: true, attendance };
		} catch (error) {
			console.error("Erro no AttendanceService:", error);
			return { success: false, error: 'Erro ao criar atendimento.' };
		}
	};

	async deleteAttendance(id) {
		try {
			if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

			await Attendances.update({ is_deleted: true }, { where: { id: id } });

			return { success: true, message: 'Atendimento excluído com sucesso.' };
		} catch (error) {
			console.error("Erro ao excluir atendimento:", error);
			return { success: false, error: 'Erro ao excluir o atendimento. Por favor, tente novamente mais tarde.' };
		}
	};

	async getAttendanceById(id) {
		try {
			if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

			const attendance = await Attendances.findByPk(id);

			if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

			return { success: true, attendance };
		} catch (error) {
			console.error("Erro ao buscar atendimento:", error);
			return { success: false, error: 'Erro ao buscar atendimento. Por favor, tente novamente mais tarde.' };
		}
	};

	async updateAttendance(id, data) {
		try {
			if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };

			const attendance = await Attendances.findByPk(id);
			if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };

			const updateData = {};

			if (data.start_date) updateData.start_date = moment(data.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			if (data.end_date) updateData.end_date = moment(data.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
			if (data.user_id !== undefined) updateData.user_id = data.user_id;
			if (data.company_id !== undefined) updateData.company_id = data.company_id;
			if (data.patient_id !== undefined) updateData.patient_id = data.patient_id;
			if (data.place_id !== undefined) updateData.place_id = data.place_id;

			if (Object.keys(updateData).length === 0) return { success: false, error: 'Nenhum campo válido foi enviado para atualização.' };
			
			const [rowsUpdated] = await Attendances.update(updateData, {
				where: { id: id },
			});

			if (rowsUpdated === 0) return { success: false, error: 'Nenhuma atualização foi realizada.' };

			return { success: true, message: 'Atendimento atualizado com sucesso.' };
		} catch (error) {
			console.error("Erro ao atualizar atendimento:", error);
			return { success: false, error: 'Erro ao atualizar o atendimento. Por favor, tente novamente mais tarde.' };
		}
	};

	async confirmAttendance(id, data) {
		try {
			if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };
	
			const { confirmed_at, confirmed_by } = data;
	
			if (!confirmed_at || !confirmed_by) return { success: false, error: 'Os campos confirmed_at e confirmed_by são obrigatórios.' };
	
			const attendance = await Attendances.findByPk(id);
			if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };
	
			const updateData = {
				confirmed_at: moment(confirmed_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
				confirmed_by
			};
	
			const [rowsUpdated] = await Attendances.update(updateData, {
				where: { id: id }
			});
	
			if (rowsUpdated === 0) return { success: false, error: 'Nenhuma confirmação foi realizada.' };
	
			return { success: true, message: 'Atendimento confirmado com sucesso.' };
		} catch (error) {
			console.error("Erro ao confirmar atendimento:", error);
			return { success: false, error: 'Erro ao confirmar o atendimento. Por favor, tente novamente mais tarde.' };
		}
	}

	async finishAttendance(id) {
		try {
			if (!id) return { success: false, error: 'O ID do atendimento é obrigatório.' };
	
			const attendance = await Attendances.findByPk(id);
			if (!attendance) return { success: false, error: 'Atendimento não encontrado.' };
	
			await Attendances.update({ finished: true }, { where: { id: id } });
	
			return { success: true, message: 'Atendimento concluído com sucesso.' };
		} catch (error) {
			console.error("Erro ao marcar o atendimento como concluído:", error);
			return { success: false, error: 'Erro ao marcar o atendimento como concluído. Por favor, tente novamente mais tarde.' };
		}
	}	
}

module.exports = new AttendanceService();
