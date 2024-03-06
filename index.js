const express=require('express')
const app = express();
const morgan=require('morgan');
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const helmet=require('helmet')


//rout
const userRouter=require("./routes/user")
const authRouter=require("./routes/auth")
const postRouter=require("./routes/post")
const commentRouter=require("./routes/comment")

dotenv.config();


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connection succesfully")
})

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/socialapp/api/users",userRouter)
app.use("/socialapp/api/auth",authRouter)
app.use("/socialapp/api/post",postRouter)
app.use("/socialapp/api/comment",commentRouter)

app.listen(8200,()=>{
    console.log("App Running on 8200.........")
})