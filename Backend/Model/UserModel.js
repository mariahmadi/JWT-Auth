const Sequelize = require("sequelize")
const { DataTypes, Model } = Sequelize
const sequelize = require('./ConfigModel')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        name: Sequelize.STRING,
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        refresh_token: {
            type: DataTypes.TEXT
        },
        Image : {
            type: Sequelize.BLOB('long')
        }
    }, {
        freezeTableName: true
    })
    const Post = sequelize.define('Post', {
        title: Sequelize.TEXT,
        content: Sequelize.TEXT

    }, {
        freezeTableName: true
    })


    User.hasMany(Post)
    Post.belongsTo(User)

    sequelize.sync({ force: true })
    console.log("Synce Both")

   
    return {User,Post}
}










