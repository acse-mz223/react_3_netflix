import express from "express"
import { getMediaByCategory, getOneMediaDetailsById, getOneMediaSimilarsById, getOneMediaTrailersById, getTrendingMedia } from "../controllers/media.controllers.js"

const movieRouter = express.Router()
// search by trending 
movieRouter.get("/trending", (req,res) => getTrendingMedia("movie", req,res))
// search by category
movieRouter.get("/:category", (req,res) => getMediaByCategory("movie", req,res))
// search film details by Id
movieRouter.get("/:id/trailers", (req,res) => getOneMediaTrailersById("movie", req,res))
movieRouter.get("/:id/details", (req,res) => getOneMediaDetailsById("movie", req,res))
movieRouter.get("/:id/similars", (req,res) => getOneMediaSimilarsById("movie", req,res))
export default movieRouter