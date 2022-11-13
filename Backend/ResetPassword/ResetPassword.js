const sendEmail = require('./SendEmail')
const { User } = require('../Model/ConfigModel').user
const { RToken } = require('../Model/ConfigModel').RToken
const crypto = require('crypto')
const bcrypt = require('bcrypt')
require('dotenv').config()
const http = require('http')


const Reset = async (req, res) => {

    const { email } = req.body

    try {
        console.log("email is " + email)
        const user = await User.findAll({ where: { email: email } })
        console.log("Founded user is ", user[0])
        if (user[0] === null || user[0] === []) {
            res.status(403).json({ Msg: "User Not Found" })
            res.end()
        }
        console.log("user Id" + user[0].id)
        //const token = await RToken.findAll({ where: { UserId: user[0].id } })
        await RToken.destroy({ where: { id: user[0].id } })
        //await token.destroy()
        console.log("Token Deleted")



        const resetToken = crypto.randomBytes(32).toString('hex')
        const newToken = bcrypt.hash(resetToken, 10)
        await RToken.create({
            token: resetToken,
            UserId: user[0].id,

        })
        const host = req.headers.hostname
        const ur = req.url
        console.log("hooost" + host)
        console.log("url", ur)
        //const url = new URL()
        console.log("ussserrrrrrrr" + user[0].email)
        const link = `${process.env.CLIENT_URL}/Resetpass?token=${resetToken}&id=${user[0].id}`
        console.log("link", link)
        await sendEmail(user[0].email, 'Reset Password', "Link Expire After 1 Hour", { link })
        res.send("Please Check Your Email")

    } catch (error) {
        console.log("eror is ", error)
        res.status(403).json("Error Occur")
    }
}
module.exports = Reset