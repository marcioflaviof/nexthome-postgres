require('dotenv').config()
var pg = require('pg')

const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const House = require('../models/House')
const Available = require('../models/Available')
const Visit = require('../models/Visit')

pg.defaults.ssl = true
const connection = new Sequelize(dbConfig)


User.init(connection)
House.init(connection)
Available.init(connection)
Visit.init(connection)

House.associate(connection.models)
Available.associate(connection.models)
Visit.associate(connection.models)

module.exports = connection