const Post = require("../Models/Post");
const User = require("../Models/User");

const router = require("express").Router()


//add Post


//middleware
const upload = require("../middleware/upload")


router.post("/add",upload.single("imageUrl"), async (req, res) => {
    try {
        const newPost = new Post(req.body);
        if(req.file){
            newPost.imageUrl = req.file.filename;
        }
        await newPost.save();
        res.status(200).json({ status: true, message: "Post added Succesfully" })

    } catch (error) {
        res.status(500).json(error)
    }
})



//update post


router.put("/update/:id", async (req, res) => {
    try {
        const PostAvaliable = await Post.findOne({ _id: req.params.id })
        if (PostAvaliable) {
            await Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
                res.status(200).json({ status: true, message: "Post Updates Succesfully" })
            }).catch((err) => {
                res.status(500).json(err)
            })
        }
    } catch (error) {
        res.status(500).json("delete Post Error")
    }
})


//delete post 

router.delete("/delete/:id", async (req, res) => {
    try {
        const PostAvaliable = await Post.findOne({ _id: req.params.id })
        if (PostAvaliable) {
            await Post.findOneAndDelete({ _id: req.params.id }).then(() => {
                res.status(200).json({ status: true, message: "Post Delete Succesfully" })
            }).catch((error) => {
                res.status(500).json("delete Post Error")
            })
        }

    } catch (error) {
        res.status(500).json("delete Post Error")
    }
})



//get post by id 


router.get("/get/:id", async (req, res) => {
    try {
        const PostAvaliable = await Post.findOne({ _id: req.params.id })
        if (PostAvaliable) {
            const abc = await Post.findOne({ _id: req.params.id })
            res.status(200).json({ status: true,message:"Post Fetch Succesfully",json: abc })
        }

    } catch (error) {
        res.status(500).json("Can not Find")
    }
})


// get all post 


router.get("/get", async (req, res) => {
    try {
        const PostAvaliable = await Post.find()
        
            res.status(200).json({ status: true,message:"Post Fetch Succesfully", json: PostAvaliable })
        
    } catch (error) {
        res.status(500).json("No Post Avaliable")
    }
})


//get post of any User by their iD 

router.get("/getUserPost/:id", async (req, res) => {
    try {
        const PostAvaliable = await Post.find({userId:req.params.id})
        
            res.status(200).json({ status: true,message:"Post Fetch Succesfully", json: PostAvaliable })
        
    } catch (error) {
        res.status(500).json("No Post Avaliable")
    }
})



//Like Post

router.put("/like/:id",async(req,res)=>{
    try {
        const user= await Post.findOne({_id:req.params.id})
        let islike= false;
        user.likes.map((item)=>{
            if(item==req.body.userId){
                islike=true; 
            }
        })

        if (islike) {
            const res1 = await Post.updateOne({ _id: req.params.id }, { $pull: { likes: req.body.userId } })
            res.status(200).json({ status: true, message: "Like Remove Sucessfully" })
        }
        else{
            const res1 = await Post.updateOne({ _id: req.params.id }, { $push: { likes: req.body.userId } })
            res.status(200).json({ status: true, message: "Like Post Sucessfully" })
        }
    } catch (error) {
        res.status(500).json({status:false,message:"Like Api Error"})
    }
})



module.exports = router