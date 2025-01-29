const Patients = require('../../models/Patients.js');

module.exports = {
	async update(req, res) {
		const updates = {};
		const { id } = req.params;
		const { name, 
				born,
				cpf,
				company_id 
			} = req.body;

		try {

			if (!id) return res.status(400).json({ error: 'Patient ID is required.' });

			const patient = await Patients.findByPk(id);

			if (!patient) return res.status(404).json({ error: 'Patient not found.' });
			
			if (name) updates.name = name;
			if (born) updates.born = born;
			if (cpf)  updates.cpf = cpf;  
			if (company_id) updates.company_id = company_id;

			if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'No fields to update.' });

			await patient.update(updates);

			return res.status(200).json({ message: 'Patient updated successfully.', patient });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'An error occurred while updating the patient.' });
		}
	}
};