const express=require("express")
const router=express.Router()

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const User=require("../models/User")

router.post('/signup',async(req,res)=>{
    try {
        const {username, password}=req.body

        const existingUser=await User.findOne({username})

        if(existingUser){
            return res.status(400).json({Message:"이미 존재하는 사용자입니다."})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=new User({
            username,
            password:hashedPassword
        })

        await user.save()

        res.status(201).json({message:"회원가입이 완료 되었습니다."})
    } catch (error) {
        res.status(500).json({message:"서버 오류 발생"})
        console.log(error)
    }
})
router.post('/login',async(req,res)=>{
    try {
        const {username, password}=req.body
        const user=await User.findOne({username}).select("+password")

        if(!user) return res.status(401).json({message:"사용자 없음"})
        if(!user.isActive)res.status(401).json({message:"비활성계정"})

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            user.failedLoginAttempts+=1
            user.lastLoginAttempt=new Date()
            if(user.failedLoginAttempts>=5){
                user.isActive=true
                await user.save()
                return res.status(401).json({message:"비밀번호 5회 이상 오류, 계정이 잠겼습니다."})
            }
            await user.save()
            return res.status(401).json({message:"비밀번호가 틀렸습니다.",
                failedAttemp: failedLoginAttempts+"번 틀림"
            })
        }

        user.failedLoginAttempts=0
        user.lastLoginAttempt=new Date()
        user.isLoggedIn=true
        
        try {
            const {data}=await axios.get()
        } catch (error) {
            
        }
        await user.save()

        const token=jwt.sign(
            {
                userId:user._id,
                username:user.username,
                role:"admin"
            },
            process.env.JWT_SECRET,
            {expiresIn:}
        )

    } catch (error) {
        
    }
})

module.exports=router