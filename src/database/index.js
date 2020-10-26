const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const House = require('../models/House')
const Available = require('../models/Available')
const Visit = require('../models/Visit')

//const connection = new Sequelize(dbConfig)

sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: process.env.DB_H_HOST,
    logging: true //false
 })

User.init(connection)
House.init(connection)
Available.init(connection)
Visit.init(connection)

House.associate(connection.models)
Available.associate(connection.models)
Visit.associate(connection.models)

module.exports = connection