const User = require('../Models/User')

const router = require('express').Router()
const bcrypt = require('bcrypt')

//register

router.post('/register', async (req, res) => {
    try {
        //bcrypt password
        const salt = await bcrypt.genSalt(10);
        const haspassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            emailId: req.body.emailId,
            mobile: req.body.mobile,
            password: haspassword,
            gender: req.body.gender,

        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json("error for created user", error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId })
        !user && res.status(200).json({ status: false, message: "user Not Found" });

        if(user){
            const Comparedecrptpassowrd = await bcrypt.compare(req.body.password,user.password)
            if(Comparedecrptpassowrd){
                res.status(200).json({ status: true, message: "User Found Sucessfully", data: user })
            }
            else{
                res.status(200).json({ status: false, message: "Wrong  Password"})
            }
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router