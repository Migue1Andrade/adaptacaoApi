const { number, object, date } = require('yup');

const attendanceSchema = object({
	user_id: number().required(),
	company_id: number().required(),
	patient_id: number().required(),
	place_id: number().required(),
	start_date: date(),
	end_date: date()
});

const attendanceServiceSchema = object({
	start_date: date(),
	end_date: date()
});

module.exports = { attendanceSchema, attendanceServiceSchema };
