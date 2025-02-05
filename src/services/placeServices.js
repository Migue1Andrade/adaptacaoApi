const Places = require('../models/Places.js');
const { Op } = require('sequelize');

class PlacesService {
	async createPlace(data) {
		try {
			const place = await Places.create({
				...data,
				is_deleted: false
			});
			return { success: true, place };
		} catch (error) {
			console.error("Erro ao criar o place:", error);
			return { success: false, error: 'Erro ao criar o place. Por favor, tente novamente mais tarde.' };
		}
	}

	async deletePlace(id) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do place é obrigatório.' };
			}

			const place = await Places.findByPk(id);
			if (!place) {
				return { success: false, error: 'Place não encontrado.' };
			}

			await Places.update({ is_deleted: true }, { where: { id: id } });

			return { success: true, message: 'Place deletado com sucesso.' };
		} catch (error) {
			console.error("Erro ao excluir o place:", error);
			return { success: false, error: 'Erro ao excluir o place. Por favor, tente novamente mais tarde.' };
		}
	}

	async getPlaceById(id) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do place é obrigatório.' };
			}

			const place = await Places.findByPk(id);
			if (!place) {
				return { success: false, error: 'Place não encontrado.' };
			}

			return { success: true, place };
		} catch (error) {
			console.error("Erro ao buscar o place:", error);
			return { success: false, error: 'Erro ao buscar o place. Por favor, tente novamente mais tarde.' };
		}
	}

	async listPlaces(query) {
		try {
			const { name, page = 1, limit = 10 } = query;

			const filters = {};
			if (name) filters.name = { [Op.iLike]: `%${name}%` };

			const offset = (page - 1) * limit;

			const { count, rows: places } = await Places.findAndCountAll({
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
					places
				}
			};
		} catch (error) {
			console.error("Erro ao listar places:", error);
			return { success: false, error: 'Erro ao listar os places.' };
		}
	}

	async updatePlace(id, data) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do place é obrigatório.' };
			}

			const place = await Places.findByPk(id);
			if (!place) {
				return { success: false, error: 'Place não encontrado.' };
			}

			const updateData = {};
			if (data.name) updateData.name = data.name;
			if (data.prefix) updateData.prefix = data.prefix;
			if (data.company_id) updateData.company_id = data.company_id;

			await place.update(updateData);

			return { success: true, message: 'Place atualizado com sucesso.', place };
		} catch (error) {
			console.error("Erro ao atualizar o place:", error);
			return { success: false, error: 'Erro ao atualizar o place. Por favor, tente novamente mais tarde.' };
		}
	}
}

module.exports = new PlacesService();
