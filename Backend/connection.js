const sql=require('mssql')

const Config = {

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