const PlacesService = require('../services/placeService');

module.exports = {
	async store(req, res) {
		try{
			const result = await PlacesService.createPlace(req.body);

		if (!result.success) return res.status(500).json({ error: result.error });

		return res.status(201).json(result.place);
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' });
		};
	},

	async delete(req, res) {
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

	async index(req, res) {
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

	async list(req, res) {
		try{const result = await PlacesService.listPlaces(req.query);

			if (!result.success) return res.status(500).json({ error: result.error });
	
			return res.status(200).json(result.data);
		}catch(erro) {
			console.log(erro);

			res.status(500).json({ message: 'erro interto' });
		};
	},

	async update(req, res) {
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
