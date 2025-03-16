import mongoose from "mongoose"
import { MONGO_URL } from "./envVars.js"

export async function connectToDb() {
    try{
        const conn = await mongoose.connect(MONGO_URL)
        console.log("MongoDb connected successfully:", conn.connection.host)
    }catch(error){
        console.log("MongoDb connection error:", error)
    }
}