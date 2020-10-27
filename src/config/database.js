require('dotenv').config()


    module.exports = {
        dialect: process.env.DIALECT,
        host: process.env.DB_H_HOST,
        port: process.env.DB_H_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_H_USERNAME,
        password: process.env.DB_H_PASS,
        ssl: {
            rejectUnauthorized: false
        },
        define: {
            timestamps: true,
            underscored: true
        }
    
    }

    // module.exports = {
    //     dialect: process.env.DIALECT,
    //     host: process.env.DB_HOST,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASS,
    //     database: process.env.DB_NAME,
    //     define: {
    //         timestamps: true,
    //         underscored: true
    //     }

    // }
 