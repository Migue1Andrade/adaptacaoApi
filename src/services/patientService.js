const Patients = require('../models/Patients.js');
const { Op } = require('sequelize');

class PatientService {x
	async createPatient(data) {
		try {
			const patient = await Patients.create(data);
			return { success: true, patient };
		} catch (error) {
			console.error("Erro ao criar o paciente:", error);
			return { success: false, error: 'Erro ao criar o paciente. Por favor, tente novamente mais tarde.' };
		}
	}

	async deletePatient(id) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do paciente é obrigatório.' };
			}

			const patient = await Patients.findByPk(id);
			if (!patient) {
				return { success: false, error: 'Paciente não encontrado.' };
			}

			await Patients.update({ is_deleted: true }, { where: { id: id } });

			return { success: true, message: 'Paciente deletado com sucesso.' };
		} catch (error) {
			console.error("Erro ao excluir o paciente:", error);
			return { success: false, error: 'Erro ao excluir o paciente. Por favor, tente novamente mais tarde.' };
		}
	}

	async getPatientById(id) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do paciente é obrigatório.' };
			}

			const patient = await Patients.findByPk(id);
			if (!patient) {
				return { success: false, error: 'Paciente não encontrado.' };
			}

			return { success: true, patient };
		} catch (error) {
			console.error("Erro ao buscar o paciente:", error);
			return { success: false, error: 'Erro ao buscar o paciente. Por favor, tente novamente mais tarde.' };
		}
	}

	async listPatients(query) {
		try {
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
		} catch (error) {
			console.error("Erro ao listar pacientes:", error);
			return { success: false, error: 'Erro ao listar os pacientes.' };
		}
	}

	async updatePatient(id, data) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do paciente é obrigatório.' };
			}

			const patient = await Patients.findByPk(id);
			if (!patient) {
				return { success: false, error: 'Paciente não encontrado.' };
			}

			const updateData = {};
			if (data.name) updateData.name = data.name;
			if (data.born) updateData.born = data.born;
			if (data.cpf) updateData.cpf = data.cpf;
			if (data.company_id) updateData.company_id = data.company_id;

			if (Object.keys(updateData).length === 0) {
				return { success: false, error: 'Nenhum campo válido foi enviado para atualização.' };
			}

			await patient.update(updateData);

			return { success: true, message: 'Paciente atualizado com sucesso.', patient };
		} catch (error) {
			console.error("Erro ao atualizar o paciente:", error);
			return { success: false, error: 'Erro ao atualizar o paciente. Por favor, tente novamente mais tarde.' };
		}
	}
}

module.exports = new PatientService();
