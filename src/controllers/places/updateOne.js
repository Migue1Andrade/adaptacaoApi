const Places = require('../../models/Places.js');

module.exports = {
	async update(req, res) {
		try {
			const updates = {};
			const { id } = req.params;
			const {
				name,
				company_id,
				prefix
			} = req.body;

			if (!id) return res.status(400).json({ error: 'place ID is required.' });

			const place = await Places.findByPk(id);

			if (!place) return res.status(404).json({ error: 'place not found.' });

			if (name) updates.name = name;
			if (prefix) updates.prefix = prefix;
			if (company_id) updates.email = company_id;

			await place.update(updates);

			return res.status(200).json({ message: 'place updated successfully.', place });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'An error occurred while updating the place.' });
		}
	}
};
