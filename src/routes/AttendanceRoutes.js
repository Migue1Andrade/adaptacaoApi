const express = require('express');
const routes = express.Router();
const validate = require('../middlewares/validateBody.js');
const { attendanceSchema, attendanceServiceSchema } = require('../validations/attendanceFormatDate.js');

const AttendanceController = require('../controllers/attendanceController.js')

routes.post('/api/create/attendance', validate(attendanceSchema), AttendanceController.store);
routes.get('/api/get/attendance/:id', AttendanceController.index);
routes.put('/api/update/attendance/:id', validate(attendanceServiceSchema), AttendanceController.update);
routes.delete('/api/delete/attendance/:id', AttendanceController.delete);
routes.put('/api/update/attendance/:id/done', AttendanceController.finish);
routes.put('/api/confirm/attendance/:id', AttendanceController.confirm);

module.exports = routes;
