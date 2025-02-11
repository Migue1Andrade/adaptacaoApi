const yup = require('yup');

const getPatientsSchema = yup.object().shape({
	name: yup.string().optional(),
	cpf: yup.string().matches(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos').optional(),
	page: yup.number().integer().min(1).default(1),
	limit: yup.number().integer().min(1).max(100).default(10)
});

module.exports = getPatientsSchema;
