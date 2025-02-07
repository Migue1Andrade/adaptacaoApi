const Places = require('../models/Places.js');
const { Op } = require('sequelize');

class PlacesService {
	async createPlace(data) {
		const place = await Places.create({
			...data,
			is_deleted: false
		});
		return { success: true, place };
	}

	async deletePlace(id) {
		if (!id) return { success: false, error: 'O ID do place é obrigatório.' };

		const place = await Places.findByPk(id);

		if (!place) return { success: false, error: 'Place não encontrado.' };

		await Places.update({ is_deleted: true }, { where: { id: id } });

		return { success: true, message: 'Place deletado com sucesso.' };
	}

	async getPlaceById(id) {
		if (!id) return { success: false, error: 'O ID do place é obrigatório.' };

		const place = await Places.findByPk(id);

		if (!place) return { success: false, error: 'Place não encontrado.' };

		return { success: true, place };
	}

	async listPlaces(query) {
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
	}

	async updatePlace(id, data) {
		if (!id) return { success: false, error: 'O ID do place é obrigatório.' };

		const place = await Places.findByPk(id);
		if (!place) return { success: false, error: 'Place não encontrado.' };

		const updateData = {};
		if (data.name) updateData.name = data.name;
		if (data.prefix) updateData.prefix = data.prefix;
		if (data.company_id) updateData.company_id = data.company_id;

		await place.update(updateData);

		return { success: true, message: 'Place atualizado com sucesso.', place };
	}
}

module.exports = new PlacesService();
