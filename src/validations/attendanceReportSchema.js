const yup = require('yup');

const attendanceReportSchema = yup.object().shape({
	aggregate: yup
		.boolean()
		.transform((value, originalValue) => {
			if (typeof originalValue === 'string') return originalValue.toLowerCase() === 'true';

			return value;
		})
		.default(false)
		.optional()
});

module.exports = attendanceReportSchema;
