const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
const authRoute=require("./routes/authRoutes")
const postRoute=require("./routes/postRoutes")

const connection=async ()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI)
     console.log("connected")
    }
    catch(err){
        console.log(err)
    }
}
app.get("/",(req,res)=>{
    res.send("Welcome to HomePage")
})
app.use("/user",authRoute)
app.use("/post",postRoute)

app.listen(process.env.PORT,()=>{
    connection()
    console.log(process.env.PORT)
})

