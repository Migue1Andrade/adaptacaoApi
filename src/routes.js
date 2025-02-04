const express = require('express');
const validate = require('./middlewares/validate.js');
const routes = express.Router();

const UserRoutes = require('./routes/UserRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');
const PatientRoutes = require('./routes/PatientRoutes');
const PlaceRoutes = require('./routes/PlaceRoutes');

const dashboard = require('./controllers/dashboard/getAll.js');
const dashSchema = require('./validations/listDashboardSchema.js');
const report = require('./controllers/reports/getAll.js');

routes.use(UserRoutes);
routes.use(CompanyRoutes);
routes.use(PatientRoutes);
routes.use(PlaceRoutes);
routes.use(PlaceRoutes);

routes.get('/api/get/dashboard', validate(dashSchema), dashboard.getDashboard);

routes.get('/api/get/reports/attencance', report.getAttendanceReport);

module.exports = routes;
