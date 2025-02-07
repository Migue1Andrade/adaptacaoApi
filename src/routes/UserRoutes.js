const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();

const userController = require('../controllers/userController.js')
const UserSchema = require('../validations/listUsersSchema');

routes.post('/api/create/user', userController.store);
routes.get('/api/get/user/:id', userController.index);
routes.put('/api/update/user/:id', userController.update);
routes.delete('/api/delete/user/:id', userController.delete);
routes.get('/api/list/users', validate(UserSchema) ,userController.list);
 
module.exports = routes;
