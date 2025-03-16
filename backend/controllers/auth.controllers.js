import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// signup = valid sign up info + encoded password + save info into db + create toke/cookies
export async function signUp(req, res) {
    console.log('signup')
    try{
        const {username, password, email} = req.body
        console.log("backend_received:",req.body)
        // valid?
        // whether backend get all data 
        if (!(username && password && email)) {
            return res.status(400).json({success: false, message: "all fields are required"})
        }
        // all date valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email"})
        }
        if (password.length < 6) {
            return res.status(400).json({success: false, message: "password must be at least 6 characters"})
        }
        // unique <= username + email
        const result_username = await User.findOne({username: username})
        if (result_username) {
            return res.status(400).json({success: false, message: "userName already exists"})
        }  
        const result_email = await User.findOne({email: email})
        if (result_email) {
            return res.status(400).json({success: false, message: "email already exists"})
        }                

        // create new user into db
        const salt = await bcryptjs.genSalt(10)
        const passwordSalted = await bcryptjs.hash(password, salt)
        const newUser = new User({username, email, password: passwordSalted})
        const createResult = await newUser.save()
        // create token + cookie
        const token = generateTokenAndSetCookie(createResult.id, res)
        console.log("created successfully:", newUser)
        res.status(201).json({success: true, message:"user created successfully", user: newUser})
    } catch(error){
        console.log("sign up failed:", error.message)
        res.status(500).json({success:false, message: error.message})
    }
}

// login = fetch info from db + compare password with bcryptjs password + return new token
export async function logIn(req, res) {
    try{
        // get info
        const {password, email} = req.body
        if (!email || !password) {
            return res.status(400).json({success:false, message: "all fields are required"})
        }
        // get user from db
        const result = await User.findOne({email:email})
        if (result){
            // have user info + check password
            const isPasswordMatch = await bcryptjs.compare(password, result.password)
            if (isPasswordMatch){
                console.log("login successfully")
                // generate new token + cookie
                const token = generateTokenAndSetCookie(result.id, res)
                console.log("sign up successfully:", result)
                return res.status(201).json({success:true, message: "login successfully", user:result})
            }
            else{
                console.log("invalid password")
                return res.status(404).json({success:false, message: "invalid password"})
            }
        }
        else{
            // havent signed up yet + invalid email
            console.log("invalid email")
            return res.status(404).json({success:false, message: "invalid email"})
        }
    }catch(error){
        console.log("error in login controller", error.message)
        res.status(500).json({success:false, message: error.message})        
    }
}

// signout = delete token
export async function logOut(req, res) {
    try{
        console.log("log out....")
        res.clearCookie("jwt-netflix")
        console.log("log out successfully")
        res.status(200).json({success: true, message:"log out successfully"})
    } catch(error){
        console.log("log out failed", error.message)
        res.status(500).json({success:false, message: error.message})
    }
} 

// check auth
export async function checkAuth(req, res) {
    console.log("checkAuth pass middleware successfully")
    res.status(200).json({success: true, message:"user authenticated", user: req.user})
}