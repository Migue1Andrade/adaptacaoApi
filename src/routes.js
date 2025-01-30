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
const patientSchema = require('./validations/listPatientsSchema.js');

const createPlace = require('./controllers/places/create.js');
const getOnePlace = require('./controllers/places/getOne.js');
const updateOnePlace = require('./controllers/places/updateOne.js');
const deleteOnePlace = require('./controllers/places/deleteOne.js');
const listPlace = require('./controllers/places/list.js')
const placeSchema = require('./validations/listPlacesSchema.js');

const createAttendance = require('./controllers/attendance/create.js');
const getOneAttendance = require('./controllers/attendance/getOne.js');
const updateOneAttendance = require('./controllers/attendance/updateOne.js');
const deleteOndeAttendance = require('./controllers/attendance/deleteOne.js');
const statusAttendance = require('./controllers/attendance/status/status.js');
const confirmAttendance = require('./controllers/attendance/status/confirm.js');

const dashboard = require('./controllers/dashboard/getAll.js');
const dashSchema = require('./validations/listDashboardSchema.js');

const report = require('./controllers/reports/getAll.js');

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

routes.post('/api/create/place', createPlace.store);
routes.get('/api/get/place/:id', getOnePlace.index);
routes.put('/api/update/place/:id', updateOnePlace.update);
routes.delete('/api/delete/places/:id', deleteOnePlace.delete);
routes.get('/api/list/place', validate(placeSchema), listPlace.list);

routes.post('/api/create/attendance', createAttendance.store);
routes.get('/api/get/attendance/:id', getOneAttendance.index);
routes.put('/api/update/attendance/:id', updateOneAttendance.update);
routes.delete('/api/delete/attendance/:id', deleteOndeAttendance.delete);
routes.put('/api/update/attendance/:id/done', statusAttendance.done);
routes.put('/api/confirm/attendance/:id', confirmAttendance.update);

routes.get('/api/get/dashboard', validate(dashSchema), dashboard.getDashboard);

routes.get('/api/get/reports/attencance', report.getAttendanceReport);

module.exports = routes;
