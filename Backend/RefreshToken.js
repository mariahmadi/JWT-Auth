const jwt = require('jsonwebtoken')
const {User} = require('./Model/ConfigModel').user



const RefreshToken = async (req, res) => {
    try {
        const refresh = req.cookies.refreshtoken

     //   console.log("coocki in refresh " + refresh)
        const user = await User.findAll({
            where: { refresh_token: refresh }
        })
    //    console.log("user is " + user[0])
        if (!user) return res.sendStatus(403)
        jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ Msg: "User is Not Found" })
            const UserId = user[0].id
            const name = user[0].name
            const email = user[0].email
            const AccesToken = jwt.sign({ UserId, name, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '180000' })
          //  console.log("ref access" + AccesToken)
            res.json({ AccesToken })


        })

    } catch (error) {
        console.log(error)
    }
}
module.exports = RefreshToken