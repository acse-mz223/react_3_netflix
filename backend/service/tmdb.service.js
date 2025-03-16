import { MOVIE_READ_ACCESS_TOKEN } from "../config/envVars.js";
import axios from 'axios';

export const fetchFromTMDB = async (url) =>{
    // set 
    const options = {
      method: 'GET',
      url: url,
      params: {
        language: 'en-US'
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + MOVIE_READ_ACCESS_TOKEN
      }
    }
    // fetch
    const result = await axios.request(options)
    // error
    if (result.status !== 200) {
        throw new error("failed to fetch data from TMDB" + result.statusText)
    }
    // return
    return result.data
}

