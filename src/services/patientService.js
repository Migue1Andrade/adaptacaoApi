const Patients = require('../models/Patients.js');
const { Op } = require('sequelize');

class PatientService {
	async createPatient(data) {
		const patient = await Patients.create(data);

		return { success: true, patient };
	}

	async deletePatient(id) {
		if (!id) return { success: false, error: 'O ID do paciente é obrigatório.' };

		const patient = await Patients.findByPk(id);

		if (!patient) return { success: false, error: 'Paciente não encontrado.' };

		await Patients.update({ is_deleted: true }, { where: { id: id } });

		return { success: true, message: 'Paciente deletado com sucesso.' };
	}

	async getPatientById(id) {
		if (!id) return { success: false, error: 'O ID do paciente é obrigatório.' };

		const patient = await Patients.findByPk(id);

		if (!patient) return { success: false, error: 'Paciente não encontrado.' };

		return { success: true, patient };
	}

	async listPatients(query) {
		const { name, cpf, page = 1, limit = 10 } = query;

		const filters = {};
		if (name) filters.name = { [Op.iLike]: `%${name}%` };
		if (cpf) filters.cpf = cpf;

		const offset = (page - 1) * limit;

		const { count, rows: patients } = await Patients.findAndCountAll({
			where: filters,
			limit,
			offset
		});

		return {
			success: true,
			data: {
				total: count,
				page: parseInt(page),
				limit: parseInt(limit),
				patients
			}
		};
	}

	async updatePatient(id, data) {

		if (!id) return { success: false, error: 'O ID do paciente é obrigatório.' };

		const patient = await Patients.findByPk(id);

		if (!patient) return { success: false, error: 'Paciente não encontrado.' };

		const updateData = {};
		if (data.name) updateData.name = data.name;
		if (data.born) updateData.born = data.born;
		if (data.cpf) updateData.cpf = data.cpf;
		if (data.company_id) updateData.company_id = data.company_id;

		if (Object.keys(updateData).length === 0) return { success: false, error: 'Nenhum campo válido foi enviado para atualização.' };

		await patient.update(updateData);

		return { success: true, message: 'Paciente atualizado com sucesso.', patient };
	}
}

module.exports = new PatientService();
