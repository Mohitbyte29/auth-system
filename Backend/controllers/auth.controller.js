import User from "../models/user.js";
import argon from "argon2"
import jwt from "jsonwebtoken"

export const signup = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({message: `User is already exists`, success: false});
        }
        const hashedPassword = await argon.hash(password, 10)
        const userModel = new User({name, email, password : hashedPassword});
        await userModel.save();
        res.status(201).json({
            message: "Singup Successfully",
            success: true
        })
    } catch(err){
        res.status(500)
        .json({message: "Internal Server Error",
            success: false
        })
    }
}

export const login = async(req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email});
        const errMessage = "Invalid Email or Password"
        if(!user){
            return res.status(400).json({message: errMessage, success: false});
        }
        const isPasswordEqual = await argon.verify(user.password, password);
        if(!isPasswordEqual){
            return res.status(400).json({error: errMessage, success: false});
        }
        const jwtToken = jwt.sign({
            email: user.email,
            _id: user._id
        }, process.env.JWT_SECRET, {expiresIn: '24h'})

        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            jwtToken,
            email, 
            name: user.name
        })
    } catch(err){
        console.log(err);
        res.status(500)
        .json({error: "Internal Server Error",
            success: false
        })
    }
}


