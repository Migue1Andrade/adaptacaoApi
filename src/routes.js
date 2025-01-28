const express = require('express');

const createCompany = require('./controllers/company/create.js');
const getOneCompany = require('./controllers/company/getOne.js');

const routes = express.Router();

routes.post('/api/create/company', createCompany.store);
routes.get('/api/get/:company_id', getOneCompany.index)

module.exports = routes;
