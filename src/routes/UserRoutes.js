const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();

const createUser = require('../controllers/users/create.js');
const getOneUser = require('../controllers/users/getOne.js');
const updateUser = require('../controllers/users/updateOne.js');
const deleteUser = require('../controllers/users/deleteOne.js');
const listUser = require('../controllers/users/list.js');
const UserSchema = require('../validations/listUsersSchema');

routes.post('/api/create/user', createUser.store);
routes.get('/api/get/user/:id', getOneUser.index);
routes.put('/api/update/user/:id', updateUser.update);
routes.delete('/api/delete/user/:id', deleteUser.delete);
routes.get('/api/list/users', validate(UserSchema) ,listUser.list);
 
module.exports = routes;
