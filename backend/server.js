import express from 'express'
import authRouter from './routes/auth.routes.js'
import { NODE_ENV, PORT } from './config/envVars.js'
import { connectToDb } from './config/db.js'
import movieRouter from './routes/movie.route.js'
import tvRouter from './routes/tv.route.js'
import cookieParser from "cookie-parser"
import protectRoute from './middleware/protectRoute.js'
import searchRouter from './routes/search.routes.js'
import path from "path";
import { fileURLToPath } from 'url';

const app = express()

app.use(express.json())  // parse body first
app.use(cookieParser()) // parse cookie

// authentification setup
app.use("/api/auth",authRouter)

// media set up
app.use("/api/movie", protectRoute,movieRouter)
app.use("/api/tv",protectRoute, tvRouter)

// search set up
app.use("/api/search",protectRoute, searchRouter)

// deployment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename)); // define __dirname <- use "type": "module" in package.json, therefore no defination of __dirname
if (NODE_ENV === "production"){
    // add front end into back end
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    // return index
    app.get("/*", (req, res)=>{
        res.sendFile(path.resolve("frontend", "dist", "index.html"))
    })
}

// listen
app.listen(PORT, ()=>{
    console.log(`Server is lisitening ${PORT}.....`)
    // console.log(__dirname)
    // console.log(__filename)
    connectToDb()
})