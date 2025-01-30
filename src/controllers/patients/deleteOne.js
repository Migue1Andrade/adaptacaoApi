const Patients = require('../../models/Patients.js');

module.exports = {
	async delete(req, res) {
		const { id } = req.params;

		try{
			if (!id) return res.status(400).json({ message: 'O ID do patient é obrigatório.' });

			const patient = await Patients.findByPk(id);

			if(!patient) return res.status(400).json({ message: 'patient nao foi encontrado' })

			await Patients.update({ is_deleted: true }, {
				where: { id: id },
			});

			return res.status(200).json({ message: 'patient deletado com sucesso' })
		}catch(E) {
			return res.status(400).json(E);
		}
	}
}
