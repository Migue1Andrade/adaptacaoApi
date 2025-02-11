const yup = require('yup');

const attendanceReportSchema = yup.object().shape({
	list: yup
		.string()
		.trim()
		.lowercase()
		.transform((value) => {
			if (value === 'false') return false;
			if (value === 'true') return true;
			return undefined;
		})
		.optional()
}).noUnknown();

module.exports = attendanceReportSchema;
