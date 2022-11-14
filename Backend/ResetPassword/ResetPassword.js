const sendEmail = require('./SendEmail')
const { User } = require('../Model/ConfigModel').user
const { RToken } = require('../Model/ConfigModel').RToken
const crypto = require('crypto')
require('dotenv').config()



const Reset = async (req, res) => {

    const { email } = req.body

    try {
        
        const user = await User.findAll({ where: { email: email } })
      
        if (user[0] === null || user[0] === []) {
            res.status(403).json({ Msg: "User Not Found" })
            res.end()
        }
       
       
        await RToken.destroy({ where: { id: user[0].id } })
     
        const resetToken = crypto.randomBytes(32).toString('hex')
    
        await RToken.create({
            token: resetToken,
            UserId: user[0].id,

        })
  
        const link = `${process.env.CLIENT_URL}/Resetpass?token=${resetToken}&id=${user[0].id}`
     
        await sendEmail(user[0].email, 'Reset Password', "Link Expire After 1 Hour", { link })
        res.send("Please Check Your Email")

    } catch (error) {
        console.log("error is ", error)
        res.status(403).json("Error Occur")
    }
}
module.exports = Reset