const Patients = require('../../models/Patients.js');

module.exports = {
	async index(req, res) {
		const { id } = req.params; 
		console.log("🚀 ~ index ~ id:", id)

		try{
			if(!id) return res.status(401).json({ message: 'id é obrigatorio' });

			const patient = await Patients.findByPk(id);
			
			if(!patient) return res.status(401).json({ message: 'pacient not found' });

			return res.status(200).json(patient);
		}catch(e) {
			console.log("🚀 ~ index ~ erro:", e);

			return res.status(500).json({ message: 'erro na requisicao'});
		}
	}
}