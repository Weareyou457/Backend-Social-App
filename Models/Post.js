const mongooose = require("mongoose")


const PostSchema = new mongooose.Schema({
    caption:{
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
    imageUrl:{
        type:String,
    },
    likes:{
        type:Array,
        default:[],
    },
    comments:{
        type:Array,
        default:[],
    }
}, { timestamps: true } )


module.exports = mongooose.model("Post",PostSchema)