const Patients = require('../models/Patients.js');
const { Op } = require('sequelize');
const filters = {};

const updatePatientData = data => {
	const updateData = {};

	if (data.name) updateData.name = data.name;
	if (data.born) updateData.born = data.born;
	if (data.cpf) updateData.cpf = data.cpf;
	if (data.company_id) updateData.company_id = data.company_id;
}
class PatientService {
	async createPatient(data) {
		const patient = await Patients.create(data);

		if(!patient) throw new Error('Erro ao criar paciente.');

		return { success: true, patient };
	};

	async deletePatient(id) {
		if (!id) throw new Error('O ID do paciente é obrigatório.');

		const patient = await Patients.findByPk(id);

		if (!patient) throw new Error('Paciente não encontrado.');

		await Patients.update({ is_deleted: true }, { where: { id: id } });

		return { success: true, message: 'Paciente deletado com sucesso.' };
	};

	async getPatientById(id) {
		if (!id) throw new Error('O ID do paciente é obrigatório.');

		const patient = await Patients.findByPk(id);

		if (!patient) throw new Error('Paciente não encontrado.');

		return { success: true, patient };
	};

	async listPatients(query) {
		const { name, cpf, page = 1, limit = 10 } = query;

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
	};

	async updatePatient(id, data) {

		if (!id) throw new Error('O ID do paciente é obrigatório.');

		const patient = await Patients.findByPk(id);

		if (!patient) throw new Error('Paciente não encontrado.');

		const updateData = updatePatientData(data);

		if (Object.keys(updateData).length === 0) throw new Error('Nenhum dado para atualizar.');

		await patient.update(updateData);

		return { success: true, message: 'Paciente atualizado com sucesso.', patient };
	};
};

module.exports = new PatientService();
