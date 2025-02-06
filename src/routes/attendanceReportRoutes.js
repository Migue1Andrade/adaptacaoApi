const express = require('express');
const routes = express.Router();

const attendanceReportController = require('../controllers/attendanceReportController');

routes.get('/api/get/reports/attencance', attendanceReportController.getAttendanceReport);

module.exports = routes;
