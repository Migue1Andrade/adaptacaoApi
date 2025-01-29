const Users = require('../../models/Users.js')

module.exports = {
	async delete(req, res) {
		try {
			const { id } = req.params;
			console.log("🚀 ~ delete ~ id:", id)

			if (!id) return res.status(400).json({ message: 'O ID do usuario é obrigatório.' });
			
			const user = await Users.findByPk(id);

			if (!user) return res.status(404).json({ message: 'usuario não encontrada.' });

			await Users.update({ is_deleted: true }, {
				where: { id: id },
			});

			return res.status(200).json({ message: 'usuario excluída com sucesso.' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Erro ao excluir a usuario. Por favor, tente novamente mais tarde.' });
		}
	}
}