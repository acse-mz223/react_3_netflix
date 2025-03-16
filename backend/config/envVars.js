import dotenv from "dotenv"

dotenv.config()

export const MONGO_URL = process.env.MONGO_URL
export const PORT = process.env.PORT || 5000
export const JWT_SECRET = process.env.JWT_SECRET
export const NODE_ENV = process.env.NODE_ENV
export const MOVIE_API_KEY = process.env.MOVIE_API_KEY
export const MOVIE_READ_ACCESS_TOKEN = process.env.MOVIE_READ_ACCESS_TOKEN