const { User } = require('./Model/ConfigModel').user
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const GetUSer = async (req, res) => {
    try {
        const Users = await User.findAll({
            attributes: ['id', 'name', 'email'],

        })
        res.json(Users)
    } catch (error) {
        console.log("eror getuser sssss: " + error)
    }
}
const UpdateUserPicture = async (req, res) => {
    const { Image } = req.body
    try {
        console.log(req.body)
        const Token = req.cookies.refreshtoken
        const user = await User.findAll({ where: { refresh_token: Token } })
        const userId = user[0].id
        console.log(userId)
        await User.update({ Image: Image }, { where: { id: userId } })

        res.send("updateeeeee")
    } catch (error) {
        console.log("eror picture sssss: " + error)
    }

}
const ChangeInfo = async (req, res) => {
    const { name } = req.body
    try {
        const Token = req.cookies.refreshtoken
        const user = await User.findAll({ where: { refresh_token: Token } })
        const userId = user[0].id
        await User.update({ name: name }, { where: { id: userId } })
        res.send("Update Success")
    } catch (error) {
        console.log(error)
    }
}
const GetImage = async (req, res) => {

    try {


        const Pic = await User.findAll({ attributes: ['Image'], where: { id: userId } })
        console.log(Pic)
        res.json(Pic[0])
    } catch (error) {
        console.log(error)
    }
}
const Register = async (req, res) => {

    const { name, email, password, confpassword } = req.body
    console.log(req.body)
    if (password != confpassword) return res.status(403).json({ Msg: "Parsword Not Match " })

    //const salt = await bcrypt.genSalt()
    const HashedPassword = await bcrypt.hash(password, 10)
    try {

        await User.create({
            name: name,
            email: email,
            password: HashedPassword
        })
        res.json({ Msg: "User Created Successfully" })
    } catch (error) {
        console.log("errordfgdfgd:" + error)
    }


}

const Login = async (req, res) => {

    try {
        const user = await User.findAll({
            where: { email: req.body.email }
        })
        console.log(req.body)

        const match = bcrypt.compareSync(req.body.password, user[0].password)

        console.log("match is " + match)


        if (!match) return res.status(400).json({ Msg: " Pasword Not Matched " })

        const UserId = user[0].id

        const name = user[0].name
        const email = user[0].email

        const AccesToken = jwt.sign({ UserId, name, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 360000 })

        const RefreshToken = jwt.sign({ UserId, name, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 1200000 })

        await User.update({ refresh_token: RefreshToken }, { where: { id: UserId } })


        res.cookie('refreshtoken', RefreshToken, {
            maxAge: 24 * 60 * 60 * 10,
        });

        res.json({ AccesToken })

    }
    catch (error) {
        res.status(404).json({ msg: "Emaiiiiil not found" });
        console.log(error)
    }
}


const Logout = async (req, res) => {
    try {
        const refreshtoken = req.cookies.refreshtoken
        console.log("logout" + refreshtoken)
        if (!refreshtoken) return res.status(204).json({ Msg: "refresh token mot find  " })
        const user = await User.findAll({
            where: { refresh_token: refreshtoken }
        })
        if (!user) return res.status(204).json({ Msg: "user not loged in " })
        const UserId = user[0].id
        await User.update({
            refresh_token: null
        }, {
            where: {
                id: UserId
            }
        })
        res.clearCookie('refreshtoken')
        res.status(200)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { GetUSer, ChangeInfo, GetImage, UpdateUserPicture, Logout, Login, Register }