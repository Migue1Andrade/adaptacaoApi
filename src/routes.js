const express = require('express');
const validate = require('./middlewares/validate.js');
const UserSchema = require('./validations/listUsersSchema');

const createCompany = require('./controllers/company/create.js');
const getOneCompany = require('./controllers/company/getOne.js');
const updateCompany = require('./controllers/company/updateOne.js');
const deleteCompany = require('./controllers/company/deleteOne.js');

const createUser = require('./controllers/users/createOne.js');
const getOneUser = require('./controllers/users/getOne.js');
const updateUser = require('./controllers/users/updateOne.js');
const deleteUser = require('./controllers/users/deleteOne.js');
const listUser = require('./controllers/users/list.js');

const routes = express.Router();

routes.post('/api/create/company', createCompany.store);
routes.get('/api/get/company/:id', getOneCompany.index);
routes.put('/api/update/company/:id', updateCompany.update);
routes.delete('/api/delete/company/:id', deleteCompany.delete);

routes.post('/api/create/user', createUser.store);
routes.get('/api/get/user/:id', getOneUser.index);
routes.put('/api/update/user/:id', updateUser.update);
routes.delete('/api/delete/user/:id', deleteUser.delete);
routes.get('/api/list/users', validate(UserSchema) ,listUser.list);

module.exports = routes;
