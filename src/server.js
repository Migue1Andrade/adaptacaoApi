require('./database');
const express = require('express');
const routes = require('./routes.js');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(routes);

const start = port => {
	try {
		app.listen(port, () => {
			console.log(`app running at: http://localhost:${port}`);
		});
	} catch (err) {
		console.error(err);
		process.exit();
	};
};

start(process.env.DB_PORT);
