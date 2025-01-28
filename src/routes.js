const express = require('express');

const createCompany = require('./controllers/company/create.js');
const getOneCompany = require('./controllers/company/getOne.js');
const updateCompany = require('./controllers/company/updateOne.js')
const deleteCompany = require('./controllers/company/deleteOne.js')

const routes = express.Router();

routes.post('/api/create/company', createCompany.store);
routes.get('/api/get/:company_id', getOneCompany.index)
routes.put('/api/update/:company_id', updateCompany.update)
routes.delete('/api/delete/:company_id', deleteCompany.delete)

module.exports = routes;
