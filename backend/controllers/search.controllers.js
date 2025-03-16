import mongoose from "mongoose";
import { User } from "../models/user.model.js"
import { fetchFromTMDB } from "../service/tmdb.service.js"

export async function getSearchContent(req, res) {
    try{
        console.log("search....")
        // get type(person + movie + tv) + query
        const {type, query} = req.params
        //console.log("params:",type,query, ".")
        // query verify
        if (!query) {
            return res.status(404).json({success: false, message:"query required"})
        }
        //update search history
        const searchItemId = new mongoose.Types.ObjectId().toString(); // generate a unique id for search item
        const updateResult = await User.findByIdAndUpdate(req.userId, {
            $push:{
                searchHistory:{
                    id: searchItemId,
                    type: type,
                    content: query,
                    createdAt: new Date()
                }
            }
        })
        // get data from db
        const result = await fetchFromTMDB(`https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=true&language=en-US&page=1`)
        if (result.results.length === 0){
            return res.status(404).json({success: false, message:"no match search result"})
        }
        console.log("search successfully")
        return res.status(200).json({success: true, result: result.results})
    } catch(error){
        console.log("search server failed:", error.message)
        res.status(500).json({success: false, message:"search internal server error"})
    }
}

// fetch search history from db  -> get latest 5
export async function getSearchHistory(req, res) {
    try{
        const result = await User.findById(req.userId).select("searchHistory")
        res.status(200).json({success:true, content: result.searchHistory.slice(-5)})
    }catch(error){
        console.log("falied to fetch search history:", error)
        res.status(500).json({success:false, message: "internal server error"})
    }
}

// delete a search history
export async function deleteSearchHistory(req, res) {
    try{
        console.log(req.params.id)
        const result = await User.findByIdAndUpdate(req.userId,{
            $pull:{
                searchHistory: {id: req.params.id}
            }
        })
        res.status(200).json({success:true,message:"delete successfully"})
    }catch(error){
        console.log("falied to delete search history:", error)
        res.status(500).json({success:false, message: "internal server error"})
    }
}