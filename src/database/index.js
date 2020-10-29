require('dotenv').config()

const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const hConfig = require('../config/herokudb')

const User = require('../models/User')
const House = require('../models/House')
const Available = require('../models/Available')
const Visit = require('../models/Visit')
const TypeDetail = require('../models/TypeDetail')
const Detail = require('../models/Detail')

var connection = null

console.log(process.env.LOCAL)

if (process.env.LOCAL) {
    var connection = new Sequelize(dbConfig)
} else {
    var connection = new Sequelize(DATABASE_URL, hConfig)
}

User.init(connection)
House.init(connection)
Available.init(connection)
Visit.init(connection)
TypeDetail.init(connection)
Detail.init(connection)

House.associate(connection.models)
Available.associate(connection.models)
Visit.associate(connection.models)
TypeDetail.associate(connection.models)
Detail.associate(connection.models)

module.exports = connection