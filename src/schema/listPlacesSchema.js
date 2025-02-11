const yup = require('yup');

const getPlacesSchema = yup.object().shape({
	name: yup.string().optional(),
	page: yup.number().integer().min(1).default(1),
	limit: yup.number().integer().min(1).max(100).default(10)
}).noUnknown();

module.exports = getPlacesSchema;
