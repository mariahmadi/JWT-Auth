const { Post } = require('../Model/ConfigModel').post
const { Op, where } = require("sequelize");
const { User } = require('../Model/ConfigModel').user


const AddPost = async (req, res) => {
    const { title, content } = req.body
    const Token = req.cookies.refreshtoken
    console.log(Token)
    const user = await User.findAll({
        where: { refresh_token: Token }
    })
    const userId = user[0].id
    console.log(userId)
    try {
        await Post.create({
            title: title,
            content: content,
            UserId: userId
        })
        res.json({ Msg: "Post Created" })
    } catch (error) {
        res.status(403).json({ Msg: error })
    }

}

const GetAllPosts = async (req, res) => {
    try {
        const Posts = await Post.findAll({
            attributes: ['id', 'title', 'content'],
        })
        console.log(Posts)
        res.json(Posts)

    } catch (error) {
        res.status(403).json({ Msg: error })
    }
}

const GetPost = async (req, res) => {

    const Token = req.cookies.refreshtoken

    const user = await User.findAll({
        where: { refresh_token: Token }
    })
    const userId = user[0].id

    try {
        const post = await Post.findAll({ where: { UserId: userId } })
        console.log(post)
        res.json(post)

    } catch (error) {
        res.status(403).json({ Msg: error })
    }

}

const UpdatePost = async (req, res) => {


    const { id, title, content } = req.body

    try {
        const UpdatePost = await Post.findAll({
            where:
            {
                id: id
            }
        })
        console.log("Post is ", UpdatePost)
        const PID = UpdatePost[0].id
        console.log(PID)
        await Post.update({ title: title, content: content }, { where: { id: PID } })
        res.send("Update Succesfulyy")
    } catch (error) {
        res.status(403).json({ Msg: error })
    }

}
const DeletePost = async (req, res) => {
    const { id } = req.body
    console.log(req.body)
    try {
        await Post.destroy({ where: { id: id } })
    } catch (error) {
        res.status(403).json({ msg: error })
    }


}

module.exports = { AddPost, GetPost, GetAllPosts, UpdatePost, DeletePost }