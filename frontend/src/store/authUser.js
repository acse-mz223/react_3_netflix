import axios from "axios"
import { data } from "react-router-dom"
import {create} from "zustand"
import toast from "react-hot-toast"

export const useAuthStore = create((set) =>({
    user: null,
    // checkAuth
    IsAuthed: false,
    IsCheckingAuth: true,
    checkauth: async (params) => {
        try{
            set({IsCheckingAuth: true})
            const res = await axios.get("/api/auth/checkAuth")
            set({IsAuthed: true})
            set({user: res.data.user})
            set({IsCheckingAuth: false})
            console.log("authed user:", res.data.user)
        }catch(error){
            console.log("unauth user")
            set({IsAuthed: false})
            set({IsCheckingAuth: false})
        }
    },
    // signUp
    isSigningup: false,
    signup: async (params) =>{  // params = {username, password, email}
        try{
            set({isSigningup:true})
            const res = await axios.post("/api/auth/signup", params)
            set({user: res.data.user})
            set({IsAuthed: true})
            toast.success(res.data.message || "sign up successfully")
            console.log('sign up successfully')
        }catch(error){
            console.log('sign up failed:', error.response)
            toast.error(error.response.data.message || "Error occured in sign up")
        }finally{
            set({isSigningup:false})
        }
    },
    // login
    islogingin: false,
    login: async (params) =>{  // params = {password, email}
        try{
            set({islogingin:true})
            const res = await axios.post("/api/auth/login", params)
            set({user: res.data.user})
            set({IsAuthed: true})
            toast.success(res.data.message || "log in successfully")
            console.log('log in successfully')
        }catch(error){
            console.log('log in failed:', error.response)
            toast.error(error.response.data.message || "Error occured in log in")
        }finally{
            set({islogingin:false})
        }
    },
    // logout
    logout: async (params) => {
        try{
            const result = await axios.get("/api/auth/logout")
            set({IsAuthed: false, user: null})
            console.log("log out successfully")
            toast.success("log out successfully")
        } catch(error){
            console.log("log out failed:", error.response.message)
            toast.error("log out failed")
        }
        
        
    }
}))