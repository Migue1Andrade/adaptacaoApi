const Users = require('../../models/Users.js');
const bcrypt = require('bcrypt');

module.exports = {
    async update(req, res) {
        try {
            const updates = {};
            const { id } = req.params;
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

            if (!id) return res.status(400).json({ error: 'User ID is required.' });
            

            const user = await Users.findByPk(id);

            if (!user) return res.status(404).json({ error: 'User not found.' });

            if (name) updates.name = name;
            if (email) updates.email = email;
            if (password) updates.password = await bcrypt.hash(password, 10);
            if (cpf) updates.cpf = cpf;
            if (phone) updates.phone = phone;
            if (type) updates.type = type;
            if (typeof root !== 'undefined') updates.root = root;
            if (company_id) updates.company_id = company_id;

            await user.update(updates);

            return res.status(200).json({ message: 'User updated successfully.', user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while updating the user.' });
        }
    }
};
