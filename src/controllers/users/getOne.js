const Users = require('../../models/Users.js');

module.exports = {
    async index(req, res) {
        try {
            const { id } = req.params;
            
            if (!id) return res.status(400).json({ error: 'User ID is required.' });
            
            const user = await Users.findByPk(id);

            if (!user)return res.status(404).json({ error: 'User not found.' });

            return res.status(200).json(user);
        } catch (error) {
            
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }
    }
};