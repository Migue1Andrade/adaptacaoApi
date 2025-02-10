const Places = require('../models/Places.js');
const { Op } = require('sequelize');
const filters = {};

const updateplaceData = data => {
	const updateData = {};

	if (data.name) updateData.name = data.name;
	if (data.prefix) updateData.prefix = data.prefix;
	if (data.company_id) updateData.company_id = data.company_id;

	return updateData;
};

class PlacesService {
	async createPlace(data) {
		const place = await Places.create({
			...data,
			is_deleted: false
		});

		if (!place) throw new Error('Erro ao criar place.');

		return { success: true, place };
	};

	async deletePlace(id) {
		if (!id) throw new Error('O ID do place é obrigatório.');

		const place = await Places.findByPk(id);

		if (!place) throw new Error('Place não encontrado.');

		await Places.update({ is_deleted: true }, { where: { id: id } });

		return { success: true, message: 'Place deletado com sucesso.' };
	};

	async getPlaceById(id) {
		if (!id) throw new Error('O ID do place é obrigatório.');

		const place = await Places.findByPk(id);

		if (!place) throw new Error('Place não encontrado.');

		return { success: true, place };
	};

	async listPlaces(query) {
		const { name, page = 1, limit = 10 } = query;

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
	};

	async updatePlace(id, data) {
		if (!id) throw new Error('O ID do place é obrigatório.');

		const place = await Places.findByPk(id);

		if (!place) throw new Error('Place não encontrado.');

		const updateData = updateplaceData(data);

		await place.update(updateData);

		return { success: true, message: 'Place atualizado com sucesso.', place };
	};
};

module.exports = new PlacesService();
