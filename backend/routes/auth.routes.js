import express from 'express'
import { checkAuth, logIn, logOut, signUp } from '../controllers/auth.controllers.js'
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()


// sign up + log in + log out
router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/logout", logOut)
// check route auth
router.get("/checkAuth", protectRoute, checkAuth)

export default router