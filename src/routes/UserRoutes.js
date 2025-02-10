const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();
const userController = require('../controllers/userController.js');
const UserSchema = require('../validations/listUsersSchema');

routes.post('/api/create/user', userController.createUser);
routes.get('/api/get/user/:id', userController.getUserById);
routes.put('/api/update/user/:id', userController.updateUser);
routes.delete('/api/delete/user/:id', userController.deleteUser);
routes.get('/api/list/users', validate(UserSchema) ,userController.listUsers);

module.exports = routes;
