const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();

const placeController = require('../controllers/placeController.js')
const placeSchema = require('../validations/listPlacesSchema.js');

routes.post('/api/create/place', placeController.store);
routes.get('/api/get/place/:id', placeController.index);
routes.put('/api/update/place/:id', placeController.update);
routes.delete('/api/delete/places/:id', placeController.delete);
routes.get('/api/list/place', validate(placeSchema), placeController.list);

module.exports = routes;
