const { Post } = require('../Model/ConfigModel').post
const { User } = require('../Model/ConfigModel').user
const { Comment } = require('../Model/ConfigModel').comment


const FetchCount = async (postId) => {
    const count = await Comment.count({ where: { PostId: postId } })
    console.log("Couuuunt" + count)
    return count

}
const FetchUserId = async (req) => {
    const Token = req.cookies.refreshtoken


    const user = await User.findAll({
        where: { refresh_token: Token }
    })
    const userId = user[0].id
    return userId


}
const mim = (a, b) => {
    return a + b
}
const GetComment = async (postId) => {
    const Comment = await Comment.findAll({ where: { PostId: postId } })
    console.log("Commmmet" + Comment)
    return Comment
}
module.exports = { FetchCount, mim, FetchUserId, GetComment }