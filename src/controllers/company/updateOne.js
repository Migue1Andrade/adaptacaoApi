const Company = require('../../models/Companies.js');

module.exports = {
	async update(req, res) {
		try {
			const updateData = {};
			const { id } = req.params;
			const { name, email, address_line, address_neighbourhood, address_city, address_state } = req.body;

			if (!id) return res.status(400).json({ message: 'O ID da companhia é obrigatório.' });

			const company = await Company.findByPk(id);

			if (!company) return res.status(404).json({ message: 'Companhia não encontrada.' });

			if (name !== undefined) updateData.name = name;
			if (email !== undefined) updateData.email = email;
			if (address_line !== undefined) updateData.address_line = address_line;
			if (address_neighbourhood !== undefined) updateData.address_neighbourhood = address_neighbourhood;
			if (address_city !== undefined) updateData.address_city = address_city;
			if (address_state !== undefined) updateData.address_state = address_state;

			if (Object.keys(updateData).length === 0) {
				return res.status(400).json({ message: 'Nenhum campo válido foi enviado para atualização.' });
			}

			const [rowsUpdated, [updatedCompany]] = await Company.update(updateData, {
				where: { id: id },
				returning: true,
			});

			if (rowsUpdated === 0) return res.status(400).json({ message: 'Nenhuma atualização foi realizada.' });

			return res.status(200).json({
				message: 'Companhia atualizada com sucesso.',
				data: updatedCompany,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao atualizar a companhia. Por favor, tente novamente mais tarde.' });
		}
	},
};
