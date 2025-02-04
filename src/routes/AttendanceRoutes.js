const express = require('express');
const routes = express.Router();

const createAttendance = require('../controllers/attendance/create.js');
const getOneAttendance = require('../controllers/attendance/getOne.js');
const updateOneAttendance = require('../controllers/attendance/updateOne.js');
const deleteOndeAttendance = require('../controllers/attendance/deleteOne.js');
const statusAttendance = require('../controllers/attendance/status/status.js');
const confirmAttendance = require('../controllers/attendance/status/confirm.js');

routes.post('/api/create/attendance', createAttendance.store);
routes.get('/api/get/attendance/:id', getOneAttendance.index);
routes.put('/api/update/attendance/:id', updateOneAttendance.update);
routes.delete('/api/delete/attendance/:id', deleteOndeAttendance.delete);
routes.put('/api/update/attendance/:id/done', statusAttendance.done);
routes.put('/api/confirm/attendance/:id', confirmAttendance.update);

module.exports = routes;
