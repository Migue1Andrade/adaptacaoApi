const Users = require('../../models/Users.js');
const { hashSync, genSaltSync } = require('bcrypt');
const saltRounds = 10;

module.exports = {
	async store(req, res) {
		const {
			name,
			email,
			password,
			cpf,
			phone,
			type,
			root,
			company_id
		} = req.body;

		try {
			const salt = genSaltSync(saltRounds);

			const user = await Users.create({
				name,
				email,
				password: hashSync(password, salt),
				cpf,
				phone,
				type,
				root,
				company_id
			})

			return res.status(200).json(user)
		}catch(e) {
			console.log(e);
			return res.status(400).json({ message: 'erro ao criar usuario, tente novamente mais tarde' })
		}
	}
}
