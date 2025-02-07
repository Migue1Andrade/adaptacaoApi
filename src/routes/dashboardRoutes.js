const express = require('express');
const routes = express.Router();
const validate = require('../middlewares/validate.js');
const dashSchema = require('../validations/listDashboardSchema.js');


const dashboardController = require('../controllers/dashboardController.js');

routes.get('/api/get/dashboard', validate(dashSchema), dashboardController.getDashboard);

module.exports = routes;
