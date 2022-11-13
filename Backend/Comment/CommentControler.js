const path = require('path')
const { FetchCount, mim, FetchUserId, GetComment } = require('../Service/Post')
const { Comment } = require('../Model/ConfigModel').comment


const CreateComment = async (req, res, next) => {
    const { content } = req.body.comment
    console.log(req.body)
    const postId = req.params.id
    const userId = await FetchUserId(req)
    console.log(userId)
    try {
        await Comment.create({
            content: req.body.comment,
            createdAt: Date.now(),
            UserId: userId,
            PostId: postId
        })
      
        res.json("Comment Submited")
    } catch (error) {
        console.log(error)
        res.status(403).json("SomeThing Wrong With Comment ")
    }

    next()
}
const ShowComment = async (req, res, next) => {
    const postid = req.params.id
    console.log("poooostid" + postid)
    try {
        if (FetchCount(postid) > 0) {
            const CommentForPost = await GetComment(postid)
            res.json(CommentForPost)
            res.end()
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json("Cant Find Comment For Pst")
    }


}
module.exports = { CreateComment, ShowComment }