const PlacesService = require('../services/placeService');

module.exports = {
	async createPlace(req, res) {
		try{
			const result = await PlacesService.createPlace(req.body);

		if (!result.success) return res.status(500).json({ error: result.error });

		return res.status(201).json(result.place);
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' });
		};
	},

	async deletePlace(req, res) {
		try{
		const { id } = req.params;
		const result = await PlacesService.deletePlace(id);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json({ message: result.message });
	}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' });
		};
	},

	async getPlaceById(req, res) {
		try{
		const { id } = req.params;
		const result = await PlacesService.getPlaceById(id);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json(result.place);
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' });
		};
	},

	async listPlaces(req, res) {
		try{const result = await PlacesService.listPlaces(req.query);

			if (!result.success) return res.status(500).json({ error: result.error });
	
			return res.status(200).json(result.data);
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' });
		};
	},

	async updatePlace(req, res) {
		try{
			const { id } = req.params;
		const result = await PlacesService.updatePlace(id, req.body);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json({ message: result.message, place: result.place });
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' })
		};
	}
};
