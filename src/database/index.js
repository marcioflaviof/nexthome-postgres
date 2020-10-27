require('dotenv').config()

const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const hConfig = require('../config/herokudb')

const User = require('../models/User')
const House = require('../models/House')
const Available = require('../models/Available')
const Visit = require('../models/Visit')

var connection = null

if (process.env.LOCAL) {
    var connection = new Sequelize(dbConfig)
} else {
    var connection = new Sequelize(hConfig)
}

User.init(connection)
House.init(connection)
Available.init(connection)
Visit.init(connection)

House.associate(connection.models)
Available.associate(connection.models)
Visit.associate(connection.models)

module.exports = connection