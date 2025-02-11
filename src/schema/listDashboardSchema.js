const yup = require('yup');

const getDashboardSchema = yup.object().shape({
	start_date:
		yup.string()
		.required('O campo start_date é obrigatório.')
		.date(),

	end_date:
		yup.string()
		.required('O campo end_date é obrigatório.')
		.date(),
}).noUnknown();

module.exports = getDashboardSchema;
