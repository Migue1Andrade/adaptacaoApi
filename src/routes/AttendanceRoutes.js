const express = require('express');
const routes = express.Router();
const validate = require('../middlewares/validateBody.js');
const { attendanceSchema, attendanceServiceSchema } = require('../schema/attendanceFormatDate.js');
const AttendanceController = require('../controllers/attendanceController.js');

routes.post('/api/create/attendance', validate(attendanceSchema), AttendanceController.createAttendance);
routes.get('/api/get/attendance/:id', AttendanceController.returnAttendanceById);
routes.put('/api/update/attendance/:id', validate(attendanceServiceSchema), AttendanceController.updateAttendance);
routes.delete('/api/delete/attendance/:id', AttendanceController.deleteAttendance);
routes.put('/api/finishi/attendance/:id', AttendanceController.finishAttendance);
routes.put('/api/confirm/attendance/:id', AttendanceController.confirmAttendance);

module.exports = routes;
