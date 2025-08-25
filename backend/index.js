const express = require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express()
const PORT=process.env.PORT
const cors=require('cors')
const cookieParser=require("cookie-parser")

dotenv.config();

app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())

app.listen(PORT,()=>{
console.log("sever is running")
})

app.get("/",(req,res)=>{
    res.send("Hello Express")
})


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB 연결 성공"))
    .catch((err)=>console.log("연결 실패",err))