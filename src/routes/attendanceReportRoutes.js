const express = require('express');
const routes = express.Router();
const validate = require('../middlewares/validate.js');
const attendanceSchema = require('../validations/attendanceReportSchema.js');
const attendanceReportController = require('../controllers/attendanceReportController');

routes.get('/api/get/reports/attencance', validate(attendanceSchema), attendanceReportController.getAttendanceReport);

module.exports = routes;
