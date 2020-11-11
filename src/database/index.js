require("dotenv").config();

const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const House = require("../models/House");
const Available = require("../models/Available");
const Visit = require("../models/Visit");
const TypeDetail = require("../models/TypeDetail");
const Detail = require("../models/Detail");
const Picture = require("../models/Picture");
const LocalType = require("../models/LocalType");

var connection = null;

if (!process.env.LOCAL) {
    var connection = new Sequelize(dbConfig.production);
    console.log("Connected on prodution");
} else {
    var connection = new Sequelize(dbConfig.development);
    console.log("Connected on development");
}

User.init(connection);
House.init(connection);
Available.init(connection);
Visit.init(connection);
TypeDetail.init(connection);
Detail.init(connection);
Picture.init(connection);
LocalType.init(connection);

User.associate(connection.models);
House.associate(connection.models);
Available.associate(connection.models);
Visit.associate(connection.models);
TypeDetail.associate(connection.models);
Detail.associate(connection.models);
Picture.associate(connection.models);

module.exports = connection;
