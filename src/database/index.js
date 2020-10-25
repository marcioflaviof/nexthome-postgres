const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const House = require('../models/House')
const Available = require('../models/Available')

const connection = new Sequelize(dbConfig)

User.init(connection)
House.init(connection)
Available.init(connection)

House.associate(connection.models)
Available.associate(connection.models)

module.exports = connection