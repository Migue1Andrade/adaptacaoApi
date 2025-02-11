const Users = require('../models/Users.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { hashSync, genSaltSync } = require('bcrypt');
const saltRounds = 10;

const updateUserData = async data => {
	const updateData = {};

	if (data.name) updateData.name = data.name;
	if (data.email) updateData.email = data.email;
	if (data.password) updateData.password = await bcrypt.hash(data.password, 10);
	if (data.cpf) updateData.cpf = data.cpf;
	if (data.phone) updateData.phone = data.phone;
	if (data.type) updateData.type = data.type;
	if (typeof data.root !== 'undefined') updateData.root = data.root;
	if (data.company_id) updateData.company_id = data.company_id;

	return updateData;
};

class UserService {
	async createUser(data) {
		const salt = genSaltSync(saltRounds);

		data.password = hashSync(data.password, salt);

		const user = await Users.create(data);

	   if(!user) throw new Error('Erro ao criar usuário');

		return { success: true, user };
	};

	async deleteUser(id) {
		if (!id) throw new Error('O ID do usuário é obrigatório.');

		const user = await Users.findByPk(id);

		if (!user) throw new Error('Usuário não encontrado.');

		await Users.update({ is_deleted: true }, { where: { id } });

		return { success: true, message: 'Usuário excluído com sucesso.' };
	};

	async getUserById(id) {
		if (!id) throw new Error('O ID do usuário é obrigatório.');

		const user = await Users.findByPk(id);

		if (!user) throw new Error('Usuário não encontrado.');

		return { success: true, user };
	};

	async listUsers(query) {
		const { name, type, page = 1, limit = 10 } = query;
		const filters = { is_deleted: false };
		const offset = (page - 1) * limit;

		if (name) filters.name = { [Op.iLike]: `%${name}%` };
		if (type) filters.type = type;

		const { count, rows: users } = await Users.findAndCountAll({
			where: filters,
			limit,
			offset
		});

		return {
			success: true,
			data: {
				total: count,
				page: parseInt(page),
				limit: parseInt(limit),
				users
			}
		};
	};

	async updateUser(id, data) {
		if (!id) throw new Error('O ID do usuário é obrigatório.');

		const user = await Users.findByPk(id);

		if (!user) throw new Error('Usuário não encontrado.');

		const updatedUsers = await updateUserData(data);

		await user.update(updatedUsers);
		return { success: true, message: 'Usuário atualizado com sucesso.', user };
	};
};

module.exports = new UserService();
