import express from "express"
import { deleteSearchHistory, getSearchContent, getSearchHistory } from "../controllers/search.controllers.js"

// search for person + movie + tv 
const searchRouter = express.Router()

// search history
searchRouter.get("/history", getSearchHistory)
searchRouter.delete("/history/:id", deleteSearchHistory)
// search
searchRouter.get("/:type/:query", getSearchContent)

export default searchRouter