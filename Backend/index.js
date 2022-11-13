const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./Model/ConfigModel')
const path = require('path')
dotenv.config()
const app = express()
const router = require('./Router')
const cookieparser = require('cookie-parser')
const multer = require('multer')
const http = require('http')
const logger = require('morgan')



//app.use(express.static('public'))
app.use('./uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieparser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// app.use((req, res, next) => {
//     // Error goes via `next()` method
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

app.use(router)


app.listen(5000, () => {
    console.log(`Server is Running on PORT ${process.env.PORT} ON DATA:${process.env.SQL_DATABASE}`)


})

