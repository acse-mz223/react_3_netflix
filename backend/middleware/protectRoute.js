import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/envVars.js"
import { User } from "../models/user.model.js"

async function protectRoute(req, res, next) {
    try{
        // get token from cookie
        const token = req.cookies["jwt-netflix"]
        // case1: no token
        if (!token) {
            return res.status(401).json({success: false, message: "no token: unauthorized"})
        }
        // case2: has token -- need to verify
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log("token correct")
        // save userId into req (will be used when operate with db later)
        req.userId = decoded.userId
        // get user info (for later use)
        const user = await User.findById(req.userId)
        req.user = user
        // next 
        next()
    } catch(error){
        console.log("Error in protectRoute middleware:", error.message)
        res.status(500).json({success:false, message: "Invalid Token or internal error" })
    }
    
}

export default protectRoute