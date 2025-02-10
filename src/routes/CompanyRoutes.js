const express = require('express');
const routes = express.Router();
const companyController = require('../controllers/companyController.js');

routes.post('/api/create/company', companyController.createCompany);
routes.get('/api/get/company/:id', companyController.getCompanyById);
routes.put('/api/update/company/:id', companyController.updateCompany);
routes.delete('/api/delete/company/:id', companyController.deleteCompany);

module.exports = routes;
