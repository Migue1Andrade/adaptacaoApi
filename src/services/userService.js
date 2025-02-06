const Users = require('../models/Users.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { hashSync, genSaltSync } = require('bcrypt');
const saltRounds = 10;

class UserService {
	async createUser(data) {
		try {
			const salt = genSaltSync(saltRounds);
			data.password = hashSync(data.password, salt);

			const user = await Users.create(data);
			return { success: true, user };
		} catch (error) {
			console.error("Erro ao criar o usuário:", error);
			return { success: false, error: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.' };
		}
	}

	async deleteUser(id) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do usuário é obrigatório.' };
			}

			const user = await Users.findByPk(id);
			if (!user) {
				return { success: false, error: 'Usuário não encontrado.' };
			}

			await Users.update({ is_deleted: true }, { where: { id: id } });

			return { success: true, message: 'Usuário excluído com sucesso.' };
		} catch (error) {
			console.error("Erro ao excluir o usuário:", error);
			return { success: false, error: 'Erro ao excluir o usuário. Por favor, tente novamente mais tarde.' };
		}
	}

	async getUserById(id) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do usuário é obrigatório.' };
			}

			const user = await Users.findByPk(id);
			if (!user) {
				return { success: false, error: 'Usuário não encontrado.' };
			}

			return { success: true, user };
		} catch (error) {
			console.error("Erro ao buscar o usuário:", error);
			return { success: false, error: 'Erro ao buscar o usuário. Por favor, tente novamente mais tarde.' };
		}
	}

	async listUsers(query) {
		try {
			const { name, type, page = 1, limit = 10 } = query;
			const filters = { is_deleted: false };

			if (name) filters.name = { [Op.iLike]: `%${name}%` };
			if (type) filters.type = type;

			const offset = (page - 1) * limit;

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
		} catch (error) {
			console.error("Erro ao listar usuários:", error);
			return { success: false, error: 'Erro ao listar usuários.' };
		}
	}

	async updateUser(id, data) {
		try {
			if (!id) {
				return { success: false, error: 'O ID do usuário é obrigatório.' };
			}

			const user = await Users.findByPk(id);
			if (!user) {
				return { success: false, error: 'Usuário não encontrado.' };
			}

			const updateData = {};
			if (data.name) updateData.name = data.name;
			if (data.email) updateData.email = data.email;
			if (data.password) updateData.password = await bcrypt.hash(data.password, 10);
			if (data.cpf) updateData.cpf = data.cpf;
			if (data.phone) updateData.phone = data.phone;
			if (data.type) updateData.type = data.type;
			if (typeof data.root !== 'undefined') updateData.root = data.root;
			if (data.company_id) updateData.company_id = data.company_id;

			await user.update(updateData);

			return { success: true, message: 'Usuário atualizado com sucesso.', user };
		} catch (error) {
			console.error("Erro ao atualizar o usuário:", error);
			return { success: false, error: 'Erro ao atualizar o usuário. Por favor, tente novamente mais tarde.' };
		}
	}
}

module.exports = new UserService();
