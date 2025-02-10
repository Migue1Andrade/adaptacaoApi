const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();
const patientController = require('../controllers/patientController.js');
const patientSchema = require('../validations/listPatientsSchema.js');

routes.post('/api/create/patient', patientController.createPatient);
routes.get('/api/get/patient/:id', patientController.getPatientById);
routes.put('/api/update/patient/:id', patientController.updatePatient);
routes.delete('/api/delete/patient/:id', patientController.deletePatient);
routes.get('/api/list/patient', validate(patientSchema), patientController.listPatients);

module.exports = routes;
