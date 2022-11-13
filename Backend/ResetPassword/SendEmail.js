const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const { google } = require('googleapis')
const credentials = require('../Credentials.json')
const fs = require('fs')
require('dotenv').config()


const sendEmail = async (email, subject, text, context) => {
    const oAuth2 = google.auth.OAuth2
    const client_secret = process.env.client_secret
    const { client_id, redirect_uris } = credentials.web;

    try {
        function getAuthenticatedClient() {
            return new Promise((resolve, reject) => {
                const oauth2Client = new oAuth2(
                    client_id, client_secret, redirect_uris[0]
                )
                const authorizedUrl = oauth2Client.generateAuthUrl({
                    scope: "https://mail.google.com/",
                    access_type: "offline",
                    prompt: 'consent',
                })

                console.log(authorizedUrl)

                resolve(oauth2Client)

            })
        }

        const oauth2Client = await getAuthenticatedClient()
       

        oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject();
                }
                resolve(token);
            });
        });
        
        oauth2Client.on("tokens", (tokens) => {
            if (tokens.refresh_token) {
                const tokenPath = path.join(__dirname, 'token.json');
                fs.writeFile(tokenPath, tokens.refresh_token)
               
            }
          
        })

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.Email,
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: process.env.REFRESH_TOKEN,

            },

        })

        var mailOption = {
            viewEngine: {

                partialDir: path.resolve('./View/'),
                defaultLayout: false
            },
            viewPath: path.resolve('./View/'),

        }
        transporter.use('compile', hbs(mailOption))
        const info = {
            from: process.env.Email,
            to: email,
            subject: subject,

            text: text,
            
            template: 'email',
            context: context,
            // attachments: [{ filename: "dt.jpg", path: "./Pic/dt.jpg" }]

        }
        transporter.sendMail(info, (err, res) => {
            if (err) {
                return console.log(err)
            }
            return console.log(res)
        })
        transporter.close()
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail 
