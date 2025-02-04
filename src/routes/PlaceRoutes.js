const express = require('express');
const validate = require('../middlewares/validate.js');
const routes = express.Router();

const createPlace = require('../controllers/places/create.js');
const getOnePlace = require('../controllers/places/getOne.js');
const updateOnePlace = require('../controllers/places/updateOne.js');
const deleteOnePlace = require('../controllers/places/deleteOne.js');
const listPlace = require('../controllers/places/list.js')
const placeSchema = require('../validations/listPlacesSchema.js');


routes.post('/api/create/place', createPlace.store);
routes.get('/api/get/place/:id', getOnePlace.index);
routes.put('/api/update/place/:id', updateOnePlace.update);
routes.delete('/api/delete/places/:id', deleteOnePlace.delete);
routes.get('/api/list/place', validate(placeSchema), listPlace.list);

module.exports = routes;
