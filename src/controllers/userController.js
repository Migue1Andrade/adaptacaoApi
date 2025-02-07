const UserService = require('../services/userService');

module.exports = {
	async store(req, res) {
		const result = await UserService.createUser(req.body);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json(result.user);
	},

	async delete(req, res) {
		const { id } = req.params;
		const result = await UserService.deleteUser(id);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json({ message: result.message });
	},

	async index(req, res) {
		const { id } = req.params;
		const result = await UserService.getUserById(id);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json(result.user);
	},

	async list(req, res) {
		const result = await UserService.listUsers(req.query);

		if (!result.success) return res.status(500).json({ error: result.error });

		return res.status(200).json(result.data);
	},

	async update(req, res) {
		const { id } = req.params;
		const result = await UserService.updateUser(id, req.body);

		if (!result.success) return res.status(400).json({ error: result.error });

		return res.status(200).json({ message: result.message, user: result.user });
	}
};
