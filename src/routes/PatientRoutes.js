const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();

const patientController = require('../controllers/patientController.js')
const patientSchema = require('../validations/listPatientsSchema.js');

routes.post('/api/create/patient', patientController.store);
routes.get('/api/get/patient/:id', patientController.index);
routes.put('/api/update/patient/:id', patientController.update);
routes.delete('/api/delete/patient/:id', patientController.delete);
routes.get('/api/list/patient', validate(patientSchema), patientController.list);

module.exports = routes;
