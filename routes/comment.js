const Router = require('express').Router()
const Comment = require("../Models/Comment")

//add Comment 

Router.post("/add", async (req, res) => {
    try {
        const NewCommment = await Comment({
            comment: req.body.comment,
            userId: req.body.userId,
            postId: req.body.postId,
            username: req.body.username
        })

        await NewCommment.save();
        res.status(200).json({ status: true, message: "Comment Add Succesfully", json: NewCommment })

    } catch (error) {
        res.status(500).json(error)
    }
})

//delete Comment

Router.delete("/delete/:id",async(req,res)=>{
    try {
        const isComment = await Comment.findOne({_id:req.params.id})

        if(isComment){
            await Comment.findOneAndDelete({_id:req.params.id})
            res.status(200).json({status:false,message:"Comment Deleted SuccesFully"})
        }
        else{
            res.status(201).json({status:false,message:"Comment not deleted Found"})
        }
    } catch (error) {
        res.status(201).json({status:false,message:"no Comment with this Id"})
    }
})

//get all Comment 

Router.get("/get/:id",async(req,res)=>{
    try {
      const all = await Comment.findOne({postId:req.params.id})
        res.status(200).json({status:true,message:"Comment Fetch SuccesFully",json:all})
    } catch (error) {
        res.status(500).json({status:false,message:"no Data Available",json:error})
    }
})


//Update Comment 

Router.put("/update/:id",async(req,res)=>{
    try {
        const CommentAvailable = await Comment.findOne({ _id: req.params.id })

        if (CommentAvailable) {
            await Comment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
                res.status(200).json({ status: true, message: "Comment Updates Succesfully" })
            }).catch((err) => {
                res.status(500).json(err)
            })
        }
        
    } catch (error) {
        res.status(500).json("Comment Update Error")
    }
})

module.exports = Router