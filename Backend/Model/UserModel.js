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
        Image: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    })
    const Post = sequelize.define('Post', {
        title: Sequelize.TEXT,
        content: Sequelize.TEXT,
        Image: Sequelize.STRING,
        Like: Sequelize.TEXT,
      
    }, {
        freezeTableName: true
    })
    const RToken = sequelize.define('RToken', {
        token: Sequelize.STRING,
        Used: { type: DataTypes.INTEGER, defaultValue: 0 },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            expires: 3600
        }
    },

        { timestamps: false })
    const Comment = sequelize.define('Comment', {
        content: Sequelize.TEXT,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

        },
       

    },

        { timestamps: false })

    User.hasMany(Post)
    Post.belongsTo(User)

    User.hasMany(Comment)
    Comment.belongsTo(User)
    Post.hasMany(Comment)
    Comment.belongsTo(Post)
    User.hasOne(RToken)
    RToken.belongsTo(User)
    sequelize.sync({ force: true })
    console.log("Synced Model")


    return { User, Post, RToken, Comment }
}










