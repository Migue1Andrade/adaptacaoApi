const UserService = require('../services/userService');

module.exports = {
	async createUser(req, res) {
		try {
			const result = await UserService.createUser(req.body);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json(result.user);
		} catch (error) {
			console.error('Erro no store:', error);

			return res.status(500).json({ error: 'Erro interno no servidor.' });
		};
	},

	async deleteUser(req, res) {
		try {
			const { id } = req.params;
			const result = await UserService.deleteUser(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message });
		} catch (error) {
			console.error('Erro no delete:', error);

			return res.status(500).json({ error: 'Erro interno no servidor.' });
		};
	},

	async getUserById(req, res) {
		try {
			const { id } = req.params;
			const result = await UserService.getUserById(id);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json(result.user);
		} catch (error) {
			console.error('Erro no index:', error);

			return res.status(500).json({ error: 'Erro interno no servidor.' });
		};
	},

	async listUsers(req, res) {
		try {
			const result = await UserService.listUsers(req.query);

			if (!result.success) return res.status(500).json({ error: result.error });

			return res.status(200).json(result.data);
		} catch (error) {
			console.error('Erro no list:', error);

			return res.status(500).json({ error: 'Erro interno no servidor.' });
		};
	},

	async updateUser(req, res) {
		try {
			const { id } = req.params;
			const result = await UserService.updateUser(id, req.body);

			if (!result.success) return res.status(400).json({ error: result.error });

			return res.status(200).json({ message: result.message, user: result.user });
		} catch (error) {
			console.error('Erro no update:', error);

			return res.status(500).json({ error: 'Erro interno no servidor.' });
		};
	}
};
