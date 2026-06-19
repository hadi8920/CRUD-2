import userModel from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

async function registerUser(req, res){

    const {username , cnic , password} = req.body

    if(!username || !cnic || !password){
        return res.status(400).json({
            error : "username , cnic and passsword are required"
        })
    }

    const isUserExists = await userModel.findOne({$or:[{username : username},{cnic : cnic}]})
    if(isUserExists){
        return res.status(400).json({
            error : "User already exists (username and cnic) should be unique"
        })
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username ,
        cnic,
        password : hashedPassword
    })

    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET)

    res.cookie("token" , token ,{
        httpOnly : true
    })

    res.status(201).json({
        message : "User registered successfully"
    })
}

async function loginUser(req , res){
    const {username , cnic , password} = req.body

    if((!username && !cnic) || !password){
        return res.status(400).json({
            error : "Username or CNIC and Password is required"
        })
    }

    const user = await userModel.findOne({$or:[{username:username},{cnic:cnic}]})
    if(!user){
        return res.status(404).json({
            error : "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            error : "Password is incorrect"
        })
    }

    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET)

    res.cookie("token" , token , {
        httpOnly : true
    })

    res.status(200).json({
        message : "User Logged in successfully"
    })
}

async function logoutUser(req, res){
    res.clearCookie("token")
    res.status(200).json({
        message : "User Logged out successfully"
    })
}


export default {
    registerUser,
    loginUser,
    logoutUser
}