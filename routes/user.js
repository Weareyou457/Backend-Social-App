const router = require('express').Router()
const bcrypt = require("bcrypt")
const User = require("../Models/User");



//Update user

router.put("/update/:id", async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
            res.status(200).json({ status: true, message: "User data Updates Succesfully" })
        }).catch((err) => {
            res.status(500).json(err)
        }) //kis ke bes par search karna hai apko &&  kya update karna hai apko vo
    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete User

router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (user) {
            User.findOneAndDelete({ _id: req.params.id }).then(() => {
                res.status(200).json({ status: true, message: "User Deleeted Succesfully" })
            })

        } else {
            res.status(200).json({ status: false, message: "User Not Found" })
        }


    } catch (error) {
        res.status(500).json(error)
    }
})


//get all User 

router.get("/get", (req, res) => {
    User.find().then((users) => {
        res.status(200).json({ status: true, message: "user Fetch Succesfullly", data: users })
    }).catch((err) => {
        res.status(500).json(err)
    })
})


//get User By Id

router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (user) {
            res.status(200).json({ status: true, message: "user Fetch Succesfullly", data: user })
        }

        if (!user) {
            res.status(200).json({ status: false, message: "user Not Present" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//Follow User api

router.put("/follow/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const CurrentUser = await User.findOne({ _id: req.body.userId })

        //alredy following 
        let isFollower = false;
        user.followers.map((item) => {
            if (item == req.body.userId) {
                isFollower = true;
            }
        })

        if (isFollower) {
            res.status(200).json({ status: true, message: "You Have Already Followed" })
        }
        else {
            const res1 = await User.updateOne({ _id: req.params.id }, { $push: { followers: req.body.userId } })
            const res2 = await User.updateOne({ _id: req.body.userId }, { $push: { following: req.params.id } })
            res.status(200).json({ status: true, message: "Followed User Succesfully" })
        }

    } catch (error) {
        res.status(500).json({ status: true, message: error })
    }
})


//Unfollow User api

router.put("/unfollow/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const CurrentUser = await User.findOne({ _id: req.body.userId })

        //alredy following 
        let isFollower = false;
        user.followers.map((item) => {
            if (item == req.body.userId) {
                isFollower = true;
            }
        })

        if (!isFollower) {
            res.status(200).json({ status: true, message: "You are not Following this user" })
        }
        else {
            const res1 = await User.updateOne({ _id: req.params.id }, { $pull: { followers: req.body.userId } })
            const res2 = await User.updateOne({ _id: req.body.userId }, { $pull: { following: req.params.id } })
            res.status(200).json({ status: true, message: "UnFollowed User Succesfully" })
        }

    } catch (error) {
        res.status(500).json({ status: true, message: error })
    }
})


module.exports = router