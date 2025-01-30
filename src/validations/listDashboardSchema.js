const yup = require('yup');

const getDashboardSchema = yup.object().shape({
	start_date: 
		yup.string()
		.required('O campo start_date é obrigatório.')
		.matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido, use DD/MM/YYYY'),
	
	end_date: 
		yup.string()
		.required('O campo end_date é obrigatório.')
		.matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido, use DD/MM/YYYY')
});

module.exports = getDashboardSchema;
