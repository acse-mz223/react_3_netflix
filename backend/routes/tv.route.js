import express from "express"
import { getMediaByCategory, getOneMediaDetailsById, getOneMediaSimilarsById, getOneMediaTrailersById, getTrendingMedia } from "../controllers/media.controllers.js"

const tvRouter = express.Router()
// test
tvRouter.get("/test", (req,res) => res.status(200).json({success:true, message: "wtrf"}))
// search by trending 
tvRouter.get("/trending", (req,res) => getTrendingMedia("tv", req,res))  
// search by category
tvRouter.get("/:category", (req,res) => getMediaByCategory("tv", req,res))
// search film details by Id
tvRouter.get("/:id/trailers", (req,res) => getOneMediaTrailersById("tv", req,res))
tvRouter.get("/:id/details", (req,res) => getOneMediaDetailsById("tv", req,res))
tvRouter.get("/:id/similars", (req,res) => getOneMediaSimilarsById("tv", req,res))
export default tvRouter