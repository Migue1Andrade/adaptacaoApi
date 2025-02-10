const Company = require('../models/Companies.js');

const updateCompanyData = data => {
	const updateData = {};

	if (data.name !== undefined) updateData.name = data.name;
	if (data.email !== undefined) updateData.email = data.email;
	if (data.address_line !== undefined) updateData.address_line = data.address_line;
	if (data.address_neighbourhood !== undefined) updateData.address_neighbourhood = data.address_neighbourhood;
	if (data.address_city !== undefined) updateData.address_city = data.address_city;
	if (data.address_state !== undefined) updateData.address_state = data.address_state;

	return updateData;
};

class CompanyService {
	async createCompany(data) {
		const company = await Company.create(data);

		return { success: true, company };
	};

	async deleteCompany(id) {
		if (!id) return { success: false, error: 'O ID da companhia é obrigatório.' };

		const company = await Company.findByPk(id);

		if (!company) return { success: false, error: 'Companhia não encontrada.' };

		await Company.update({ is_deleted: true }, { where: { id: id } });

		return { success: true, message: 'Companhia excluída com sucesso.' };
	};

	async getCompanyById(id) {
		if (!id) return { success: false, error: 'O ID da clínica é obrigatório.' };

		const company = await Company.findByPk(id);

		if (!company) return { success: false, error: 'Clínica não encontrada.' };

		return { success: true, company };
	};

	async updateCompany(id, data) {
		if (!id) return { success: false, error: 'O ID da companhia é obrigatório.' };

		const company = await Company.findByPk(id);

		if (!company) return { success: false, error: 'Companhia não encontrada.' };

		const updateData = updateCompanyData(data);

		if (Object.keys(updateData).length === 0) return { success: false, error: 'Nenhum campo válido foi enviado para atualização.' };

		const [rowsUpdated] = await Company.update(updateData, {
			where: { id: id }
		});

		if (rowsUpdated === 0) return { success: false, error: 'Nenhuma atualização foi realizada.' };

		return { success: true, message: 'Companhia atualizada com sucesso.' };
	};
}

module.exports = new CompanyService();
