const validate = schema => async (req, res, next) => {
	try {
		await schema.validate(req.params, { abortEarly: false });

		next();
	} catch (error) {
		return res.status(400).json({ error: error.errors || 'Invalid request parameters' });
	};
};

module.exports = validate;
