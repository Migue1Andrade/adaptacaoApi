const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();
const placeController = require('../controllers/placeController.js');
const placeSchema = require('../validations/listPlacesSchema.js');

routes.post('/api/create/place', placeController.createPlace);
routes.get('/api/get/place/:id', placeController.getPlaceById);
routes.put('/api/update/place/:id', placeController.updatePlace);
routes.delete('/api/delete/places/:id', placeController.deletePlace);
routes.get('/api/list/place', validate(placeSchema), placeController.listPlaces);

module.exports = routes;
