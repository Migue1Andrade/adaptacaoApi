const express = require('express');
const validate = require('./middlewares/validate.js');

const createCompany = require('./controllers/company/create.js');
const getOneCompany = require('./controllers/company/getOne.js');
const updateCompany = require('./controllers/company/updateOne.js');
const deleteCompany = require('./controllers/company/deleteOne.js');

const createUser = require('./controllers/users/create.js');
const getOneUser = require('./controllers/users/getOne.js');
const updateUser = require('./controllers/users/updateOne.js');
const deleteUser = require('./controllers/users/deleteOne.js');
const listUser = require('./controllers/users/list.js');
const UserSchema = require('./validations/listUsersSchema');

const createPatient = require('./controllers/patients/create.js');
const getOnePatient = require('./controllers/patients/getOne.js');
const updateOnePatient = require('./controllers/patients/updateOne.js');
const deletePatient = require('./controllers/patients/deleteOne.js');
const listPatient = require('./controllers/patients/list.js');
const patientSchema = require('./validations/listPatientsSchema.js')

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

routes.post('/api/create/patient', createPatient.store);
routes.get('/api/get/patient/:id', getOnePatient.index);
routes.put('/api/update/patient/:id', updateOnePatient.update);
routes.delete('/api/delete/patient/:id', deletePatient.delete);
routes.get('/api/list/patient', validate(patientSchema), listPatient.list);

module.exports = routes;
