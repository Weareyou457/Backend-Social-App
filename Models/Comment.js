const mongooose = require("mongoose")


const CommentSchema = new mongooose.Schema({
    comment:{
        type:String,
        max:200,
    },
    userId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    }
}, { timestamps: true } )


module.exports = mongooose.model("Comment",CommentSchema)