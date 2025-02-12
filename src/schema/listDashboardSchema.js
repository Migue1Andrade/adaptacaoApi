const yup = require('yup');

const getDashboardSchema = yup.object().shape({
    start_date:
        yup.string()
        .required('O campo start_date é obrigatório.')
        .transform(function(value, originalValue) {
            return originalValue ? new Date(originalValue.split('/').reverse().join('-')) : null;
        }),

    end_date:
        yup.string()
        .required('O campo end_date é obrigatório.')
        .transform(function(value, originalValue) {
            return originalValue ? new Date(originalValue.split('/').reverse().join('-')) : null;
        }),
}).noUnknown();

module.exports = getDashboardSchema;
