const express = require('express');
const routes = express.Router();

const companyController = require('../controllers/companyController.js')

routes.post('/api/create/company', companyController.store);
routes.get('/api/get/company/:id', companyController.index);
routes.put('/api/update/company/:id', companyController.update);
routes.delete('/api/delete/company/:id', companyController.delete);

module.exports = routes;
