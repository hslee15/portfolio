const express = require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express()
const PORT=process.env.PORT
const cookieParser=require("cookie-parser")

dotenv.config();

app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONT_ORIGIN,
    credentials:true
}))

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("연결 성공")
}).catch((error)=>console.log("연결 실패",error))

const userRoutes =require("./routes/user")
app.use("/api/auth",userRoutes)

app.listen(PORT,()=>{
console.log("sever is running")
})

app.get("/",(req,res)=>{
    res.send("Hello Express")
})
