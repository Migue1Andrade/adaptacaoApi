const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Attendances = require('../models/Attendances.js');
const Companies = require('../models/Companies.js');
const Patients = require('../models/Patients.js');
const Places = require('../models/Places.js');
const Users = require('../models/Users.js');

const models = [Attendances, Companies, Patients, Places, Users];
const connection = new Sequelize(dbConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
