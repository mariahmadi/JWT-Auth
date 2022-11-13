const { User } = require('./Model/ConfigModel').user
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { RToken } = require('./Model/ConfigModel').RToken
const crypto = require('crypto')
require("dotenv").config();
const upload = require('./Upload')
const path = require('path')

const fs = require('fs')


const GetUSer = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],

        })
        res.json(users)
        next()
    } catch (error) {
        res.json(error)
    }
}
const UpdateUserPicture = async (req, res, next) => {
    console.log("pic" + req.body)
    const Token = req.cookies.refreshtoken
    const user = await User.findAll({ where: { refresh_token: Token } })
    const userId = user[0].id
    console.log(userId)
    try {
        upload(req, res, (err) => {
            if (err) { return res.sendStatus(403).json("Eroooor") }

            const pathToImg = fs.readFileSync(path.join('./uploads', req.file.filename))
            const base64Img = pathToImg.toString("base64")

            User.update({ Image: req.file.filename }, { where: { Id: userId } })
            res.json(base64Img)
        })
        next()

    } catch (error) {
        console.log("error picture sssss: " + error)
        res.status(403).json("Error")
    }

}
const ChangeInfo = async (req, res, next) => {
    const { name } = req.body
    try {
        const Token = req.cookies.refreshtoken
        const user = await User.findAll({ where: { refresh_token: Token } })
        const userId = user[0].id
        await User.update({ name: name }, { where: { id: userId } })
        res.send("Update Success")
        next()
    } catch (error) {
        console.log(error)
    }
}
const GetImage = async (req, res, next) => {

    try {
        const Token = req.cookies.refreshtoken
        const user = await User.findAll({ where: { refresh_token: Token } })
        const userId = user[0].id
        console.log("user" + user[0])
        console.log(user[0].Image)
        if (user[0].Image !== null) {
            const pathToImg = fs.readFileSync(path.join('./uploads', user[0].Image))
            console.log(pathToImg)
            const base64Img = pathToImg.toString("base64")
            res.json(base64Img)
        } else {

            const pathToImg = fs.readFileSync(path.join('./Pic', "Nullimages.png"))
            console.log("pathhhhh", pathToImg)
            const base64Img = pathToImg.toString("base64")
            res.json(base64Img)
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(403).json("Cant Get IT")
    }
}
const NewPassword = async (req, res, next) => {
    const { token, id, data } = req.body

    const tokenuser = await RToken.findAll({ where: { UserId: id } })

    const userID = tokenuser[0].id
    const hashedPass = await bcrypt.hash(data.password, 10)
    console.log("id", userID)
    try {
        if (token === tokenuser[0].token && tokenuser[0].Used == 0) {

            await User.update({ password: hashedPass }, { where: { id: id } })
            await RToken.update({ Used: 1 }, { where: { UserId: id } })
            res.json("Password Changed Succesfully Please Sign in")
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json("Something Went Worng")
    }
}


const Register = async (req, res, next) => {

    const { data } = req.body

    const user = await User.findOne({ where: { email: data.email } })

    if (user !== null) {
        return res.status(403).json({ Msg: "Email Already Exist" })
    }
    if (data.password != data.confpassword) return res.status(403).json({ Msg: "Parsword Not Match Please Insert Correcc" })


    const HashedPassword = await bcrypt.hash(data.password, 10)
    const token = crypto.randomBytes(32).toString('hex')


    try {

        await User.create({
            name: data.name,
            email: data.email,
            password: HashedPassword
        })
        const newUser = await User.findOne({ where: { email: data.email } })

        await RToken.create({
            token: token,
            UserId: newUser.id
        })
        res.json({ Msg: "User Created Successfully" })
        next()
    } catch (error) {
        console.log("register error:" + error)
        res.status(402).json("Cant Register User Try Again")
    }


}

const Login = async (req, res, next) => {
    const { data } = req.body
    try {
        const user = await User.findAll({
            where: { email: data.email }
        })

        const match = await bcrypt.compare(data.password, user[0].password)

        if (!match) { return res.status(400).json({ Msg: " Pasword Not Matched " }) }

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
        res.status(404).json({ msg: "Emaiiiiil Or Password is Wrong" });
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

module.exports = { GetUSer, NewPassword, ChangeInfo, GetImage, UpdateUserPicture, Logout, Login, Register }