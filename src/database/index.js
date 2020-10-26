const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const House = require('../models/House')
const Available = require('../models/Available')
const Visit = require('../models/Visit')

//const connection = new Sequelize(dbConfig)

const connection = new Sequelize(process.env.DATABASE_URL, {
    dialect:  process.env.DIALECT,
    protocol: process.env.DIALECT,
    port:     process.env.DB_H_PORT,
    host:     process.env.DB_H_HOST,
    logging:  true //false
  })

User.init(connection)
House.init(connection)
Available.init(connection)
Visit.init(connection)

House.associate(connection.models)
Available.associate(connection.models)
Visit.associate(connection.models)

module.exports = connection