require('dotenv').config()

 if (process.env.DATABASE_URL) {
    module.exports = {
        dialect: process.env.DIALECT,
        protocol: process.env.PROTOCOL,
        host: process.env.DB_H_HOST,
        port: process.env.DB_H_PORT,
        database: process.env.DB_NAME,
        SSL: true,
        define: {
            timestamps: true,
            underscored: true
        }
    
    }
 } else {
    module.exports = {
        dialect: process.env.DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        SSL:true,
        define: {
            timestamps: true,
            underscored: true
        }

    }
 }