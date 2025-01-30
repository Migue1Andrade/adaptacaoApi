const Places = require('../../models/Places.js');

module.exports = {
	async store(req, res) {
		const { name, company_id, prefix } = req.body;

		try {
			const place = await Places.create({
				name, 
				company_id,
                prefix,
                is_deleted: false
			});

			res.status(200).json(place);
		}catch(E) {
			console.log(E);
			
			res.status(500).json({ message: 'nao foi possivel criar um novo local, tente novemente mais tarde' });
		}
	}
}