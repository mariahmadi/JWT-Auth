const { Post } = require('../Model/ConfigModel').post
const { Op, where } = require("sequelize");
const { User } = require('../Model/ConfigModel').user
const Upload = require('../Upload')
const path = require('path')
const fs = require('fs')
const { FetchCount, GetComment, FetchUserId } = require('../Service/Post')
const { Comment } = require('../Model/ConfigModel').comment

const AddPost = async (req, res, next) => {

    console.log("reqqqqqqqqqq" + req.body)
    const userId = await FetchUserId(req)


    console.log(userId)
    try {


        Upload(req, res, (err) => {
            if (err) { return res.status(403).json("File Not Found") }
            console.log(req.body.content)
            console.log(req.body)
            console.log(req.file)
            const title = req.body.title[0]
            const content = req.body.content[0]
            console.log("first", title)
            console.log(req.body.title)
            if (req.file) {
                const pathtoImg = req.file.filename
                Post.create({
                    title: title,
                    content: content,
                    Image: pathtoImg,
                    Like: 0,
                    UserId: userId
                })
            }
            else {
                Post.create({
                    title: title,
                    content: content,
                    Like: 0,
                    UserId: userId
                })
            }
        })
        res.json("Post Created")
        next()

    } catch (error) {
        res.status(403).json(error)
    }

}

const GetAllPosts = async (req, res) => {
    try {

        const PageNumber = 1
        console.log("PageNumber " + PageNumber)
        const limit = parseInt(req.query.limit) || 4
        const skip = parseInt(req.query.skip) || 0

        console.log("query", req.query)
        console.log("limit" + limit)

        console.log("Skip", skip)
        const result = {}
        const totalPost = await Post.count()
        console.log(totalPost)
        let startIndex = skip * limit
        const endIndex = (skip + 1) * limit

        const current = 1
        result.totalPost = totalPost
        if (startIndex > 0) {
            result.previous = {
                skip: skip - 1,
                limit: limit,


            }
        }
        if (endIndex < totalPost) {
            result.next = {
                skip: skip + 1,
                limit: limit,

            }
        }
        result.data = await Post.findAll({
            offset: skip, limit: limit,
            order: [
                ['id', 'DESC']]
        },)


        result.rowPerPage = limit

        const base2 = []
        for (let i = 0; i < result.data.length; i++) {
            const Image = result.data[i].Image
            if (Image === null || Image === undefined) {
                const pathToImg = fs.readFileSync(path.join("./Pic", "Nullpost.jpg"))
                const base = pathToImg.toString('base64')
                base2.push(base)
            }
            else {
                const pathToImg = fs.readFileSync(path.join("./uploads", Image))

                const base = pathToImg.toString('base64')

                base2.push(base)
            }
        }
        res.json({ data: result, pic: base2 })

    } catch (error) {
        res.status(403).json({ Msg: error })
    }
}
const LikeCounter = async (req, res) => {
    const { likes } = req.body.like
    console.log("reqqqqq" + req.body, likes)
    const postId = req.params.id
    //console.log(postId)


    try {
        await Post.update({ Like: likes }, { where: { id: postId } })
        //  console.log("like" + LikeCount)
        res.json("like Submited")

    } catch (error) {
        console.log(error)
        res.status(403).json("Erooor")
    }
}
const GetMyPost = async (req, res) => {

    const Token = req.cookies.refreshtoken

    const user = await User.findAll({
        where: { refresh_token: Token }
    })
    const userId = user[0].id

    try {
        const post = await Post.findAll({ where: { UserId: userId } })
        const base2 = []
        for (let i = 0; i < post.length; i++) {
            const Image = post[i].Image
            if (Image === null || Image === undefined) {
                const pathToImg = fs.readFileSync(path.join("./Pic", "Nullpost.jpg"))
                const base = pathToImg.toString('base64')
                base2.push(base)
            }
            else {
                const pathToImg = fs.readFileSync(path.join("./uploads", Image))

                const base = pathToImg.toString('base64')

                base2.push(base)
            }



        }
        res.json({ post: post, base: base2 })


    } catch (error) {
        res.status(403).json({ Msg: error })
    }

}
const PostView = async (req, res, next) => {

    const id = req.params.id
    const CommentCount = await FetchCount(id)
    try {
        const post = await Post.findAll({ where: { id: id } })
        const base2 = []
        const Comments = []
        const Image = post[0].Image
        if (Image === null || Image === undefined) {
            const pathToImg = fs.readFileSync(path.join("./Pic", "Nullpost.jpg"))
            const base = pathToImg.toString('base64')
            base2.push(base)
        }
        else {
            const pathToImg = fs.readFileSync(path.join("./uploads", Image))
            const base = pathToImg.toString('base64')
            base2.push(base)
        }

        if (CommentCount > 0) {
            const CommentForPost = await Comment.findAll({ where: { PostId: id }, order: [["id", "DESC"]] })

            // res.json(CommentForPost)
            Comments.push(CommentForPost)
        }

        res.json({ post: post[0], pic: base2, comment: Comments })
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json(error)
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

module.exports = { AddPost, PostView, GetMyPost, LikeCounter, GetAllPosts, UpdatePost, DeletePost }