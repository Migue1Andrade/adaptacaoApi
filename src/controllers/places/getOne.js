const Places = require('../../models/Places.js');

module.exports = {
	async index(req, res) {
		const { id } = req.params;

		try{
			if(!id) return res.status(401).json({ message: 'id é obrigatorio' });

			const place = await Places.findByPk(id);

			if(!place) return res.status(401).json({ message: 'place not found' });

			return res.status(200).json(place);
		}catch(e) {
			console.log("🚀 ~ index ~ erro:", e);

			return res.status(500).json({ message: 'erro na requisicao'});
		}
	}
}
