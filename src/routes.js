const express = require('express');
const routes = express.Router();

const UserRoutes = require('./routes/UserRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');
const PatientRoutes = require('./routes/PatientRoutes');
const PlaceRoutes = require('./routes/PlaceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const attendanceReportRoutes = require('./routes/attendanceReportRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes')

routes.use(UserRoutes);
routes.use(CompanyRoutes);
routes.use(PatientRoutes);
routes.use(PlaceRoutes);
routes.use(PlaceRoutes);
routes.use(dashboardRoutes);
routes.use(attendanceReportRoutes);
routes.use(attendanceRoutes);

module.exports = routes;
