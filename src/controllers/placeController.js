const PlacesService = require('../services/placeServices');

module.exports = {
	async store(req, res) {
		const result = await PlacesService.createPlace(req.body);

		if (!result.success) {
			return res.status(500).json({ error: result.error });
		}

		return res.status(201).json(result.place);
	},

	async delete(req, res) {
		const { id } = req.params;
		const result = await PlacesService.deletePlace(id);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json({ message: result.message });
	},

	async index(req, res) {
		const { id } = req.params;
		const result = await PlacesService.getPlaceById(id);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json(result.place);
	},

	async list(req, res) {
		const result = await PlacesService.listPlaces(req.query);

		if (!result.success) {
			return res.status(500).json({ error: result.error });
		}

		return res.status(200).json(result.data);
	},

	async update(req, res) {
		const { id } = req.params;
		const result = await PlacesService.updatePlace(id, req.body);

		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(200).json({ message: result.message, place: result.place });
	}
};
