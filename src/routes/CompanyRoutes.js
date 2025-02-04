const express = require('express');
const routes = express.Router();

const createCompany = require('../controllers/company/create.js');
const getOneCompany = require('../controllers/company/getOne.js');
const updateCompany = require('../controllers/company/updateOne.js');
const deleteCompany = require('../controllers/company/deleteOne.js');

routes.post('/api/create/company', createCompany.store);
routes.get('/api/get/company/:id', getOneCompany.index);
routes.put('/api/update/company/:id', updateCompany.update);
routes.delete('/api/delete/company/:id', deleteCompany.delete);

module.exports = routes;
