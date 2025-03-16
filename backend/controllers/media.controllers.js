import { fetchFromTMDB } from "../service/tmdb.service.js"

// fetch the trending media => heros
export async function getTrendingMedia(type,req, res) {
    console.log("trending")
    try{
        const result = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`)
        //console.log("result:",result)
        const randomMedia = result.results[Math.floor(Math.random()* result.results.length)]
        console.log("trending getten successfully")
        res.status(201).json({success: true, content: randomMedia})
    } catch(error){
        console.log("trending getten failed")
        res.status(500).json({success: false, message: "Internal server(getTrendingMedia) error"})
    }
}

// fetch the a media trailors 
export async function getOneMediaTrailersById(type,req, res) {
    try{
        const result = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${req.params.id}/videos`)
        //console.log(result)
        res.status(200).json({success: true, content: result.results})
    } catch(error){
        if (error.message.includes("404")){
            return res.status(404).json({success: false, message:"no resources"})
        }
        res.status(500).json({success: false, message: "Internal server(getMediaTrailerById) error"})
    }
}

// fetch the a media details 
export async function getOneMediaDetailsById(type,req, res) {
    try{
        const result = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${req.params.id}`)
        //console.log(result)
        res.status(200).json({success: true, content: result})
    } catch(error){
        if (error.message.includes("404")){
            return res.status(404).json({success: false, message:"no resources"})
        }
        res.status(500).json({success: false, message: "Internal server(getOneMediaDetailsById) error"})
    }
}

// fetch the similar medias of a media
export async function getOneMediaSimilarsById(type,req, res) {
    try{
        const result = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${req.params.id}/similar`)
        // console.log(result.results)
        res.status(200).json({success: true, content: result.results})
    } catch(error){
        if (error.message.includes("404")){
            return res.status(404).json({success: false, message:"no resources"})
        }
        res.status(500).json({success: false, message: "Internal server(getOneMediaSimilarsById) error"})
    }
}

// fetch medias by category 
//  movie category: now_Playing + popular + top_rated + upcoming
//  tv category: airing_today + popular + top_rated + on_the_air
export async function getMediaByCategory(type,req, res) {
    try{
        const result = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${req.params.category}?language=en-US&page=1`)
        console.log(`category-${req.params.category} successfully get`)
        res.status(200).json({success: true, content: result.results})
    } catch(error){
        if (error.message.includes("404")){
            return res.status(404).json({success: false, message:"no resources"})
        }
        res.status(500).json({success: false, message: "Internal server(getOneMediaSimilarsById) error"})
    }
}