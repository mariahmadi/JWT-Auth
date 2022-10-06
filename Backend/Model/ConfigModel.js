const Sequelize = require('sequelize')
//const DB = require('../connection')
const tedious = require('tedious');

//const Connection=new tedious.Connection()




const Config = {
    //driver: process.env.SQL_SERVER,
    database: 'FooBar',
    server: 'DESKTOP-GULV8VA',
    user: 'sa',
    password: '1',
    host: 'localhost',
    dialect: "mssql",
    port: 1433,
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
const sequelize = new Sequelize(Config.database, Config.user, Config.password, {
    // server: process.env.SQL_SERVER,
    // dialect: "mssql",
    // host: process.env.SQL_HOST,
    // pool: {
    //     max: Config.pool.max,
    //     min: Config.pool.min
    // }
    database: 'FooBar',
    server: 'DESKTOP-GULV8VA',
    user: 'sa',
    password: '1',
    host: 'localhost',
    dialect: "mssql",
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {

        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }

})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
EnsureDBexist(Config.database)


function EnsureDBexist(dbName) {

    return new Promise((resolve, rejects) => {

        const connection = new tedious.Connection(Config, (errr) => {
            connection.connect((err) => {
                if (err) {
                    console.error(err)
                    rejects(`connection Faild ${err.message}`)
                }
                const CreateDB = `IF NOT EXIST (SELECT * FROM SYS.database WHERE name=${dbName})`
                const request = new tedious.Request(CreateDB, (err) => {
                    if (err) {
                        console.error(err)
                        rejects(`connection Faild ${err.message}`)

                    }
                    resolve()
                })
                connection.execSql(request)
            })
            if (errr) console.log(errr)
        })

    }

    )
}
const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.user = require('./UserModel')(sequelize, Sequelize)
db.post = require('./UserModel')(sequelize, Sequelize)
module.exports = db



