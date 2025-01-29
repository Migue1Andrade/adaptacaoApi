const yup = require('yup');

const getUsersSchema = yup.object().shape({
	name: yup.string().optional(),
	type: yup.string().oneOf(['admin', 'medico', 'recepcionista']).optional(),
	page: yup.number().integer().min(1).default(1),
	limit: yup.number().integer().min(1).max(100).default(10)
});

module.exports = getUsersSchema;
