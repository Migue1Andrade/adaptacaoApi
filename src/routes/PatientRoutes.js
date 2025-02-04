const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();

const createPatient = require('../controllers/patients/create.js');
const getOnePatient = require('../controllers/patients/getOne.js');
const updateOnePatient = require('../controllers/patients/updateOne.js');
const deletePatient = require('../controllers/patients/deleteOne.js');
const listPatient = require('../controllers/patients/list.js');
const patientSchema = require('../validations/listPatientsSchema.js');

routes.post('/api/create/patient', createPatient.store);
routes.get('/api/get/patient/:id', getOnePatient.index);
routes.put('/api/update/patient/:id', updateOnePatient.update);
routes.delete('/api/delete/patient/:id', deletePatient.delete);
routes.get('/api/list/patient', validate(patientSchema), listPatient.list);

module.exports = routes;
