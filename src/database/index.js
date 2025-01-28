const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Companies = require('../models/Companies.js');

const models = [Companies];
const connection = new Sequelize(dbConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));