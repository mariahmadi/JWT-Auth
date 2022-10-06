const sql=require('mssql')

const Config = {
    //driver: process.env.SQL_SERVER,
    // database: process.env.SQL_DATABASE,
    // server: 'DESKTOP-GULV8VA',
    // user: process.env.SQL_USERNAME,
    // password: process.env.SQL_PASSWORD,
    // HOST: process.env.SQL_HOST ,
    // port: 1433 ,
    // dialect: "mssql",
    // pool: {
    //     max: 10,
    //     min: 0,
    //     idleTimeoutMillis: 30000
    // },
    // options: {

    //     encrypt: true, // for azure
    //     trustServerCertificate: true // change to true for local dev / self-signed certs
    // }

    database: 'FooBar',
    server: 'DESKTOP-GULV8VA',
    user: 'sa',
    password: '1',
    host: 'localhost',
    dialect: "mssql",
    port: 1433 ,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {

        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
    
}

module.exports = Config