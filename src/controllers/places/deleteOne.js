const Places = require('../../models/Places.js');

module.exports = { 
	async delete(req, res) {
		const { id } = req.params;

		try{
			if (!id) return res.status(400).json({ message: 'O ID do patient é obrigatório.' });

			const place = await Places.findByPk(id);

			if(!place) return res.status(400).json({ message: 'patient nao foi encontrado' });

			await Places.update({ is_deleted: true }, {
				where: { id: id },
			});

			return res.status(200).json({ message: 'patient deletado com sucesso' })
		}catch(E) {
			return res.status(400).json(E);
		}
	}
}