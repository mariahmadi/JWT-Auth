const jwt = require('jsonwebtoken')


const VerifyToken = (req, res, next) => {
    const AuthHeader = req.headers['Authorization']
    const token = AuthHeader && AuthHeader.split[' '][1]
    if (!token) return res.status(403).json({ Msg: "Not Verified" })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403)
        req.email = decoded.email
      //  console.log(decoded.email)
        next()

    })

}
module.exports = VerifyToken