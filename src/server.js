require('dotenv').config();
require('./database');
const express = require('express');
const routes = require('./routes.js');
const process = require('process');
const app = express();

app.use(express.json());
app.use(routes);

const start = port => {
	try {
		app.listen(port, () => {
			console.log(`app running at: http://localhost:${port}`);
		});

	} catch (error) {
		console.error(error);
		process.exit();
	};
};

start(process.env.DB_PORT);
