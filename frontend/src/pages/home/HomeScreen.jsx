import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InfoIcon, LogOutIcon, PlayIcon, SearchIcon } from "lucide-react";
import { useAuthStore } from '../../store/authUser';
import useContentStore from '../../store/content';
import axios from 'axios';
import { CATEGORY, ORG_IMG_URL } from '../../utils/constants';
import Slider from '../../components/Slider';
import Navbar from '../../components/Navbar';

function HomeScreen() {
    // api
    const {logout} = useAuthStore()
    const {content, contentToMovie, contentToTv} = useContentStore()
    // get trending content 
    const [trending, setTrending] = useState()
    useEffect(() =>{
        const getTrendingFunc = async () => {
            try{
                const resTrending = await axios.get(`api/${content}/trending`) 
                setTrending(resTrending.data.content)  // content: backdrop_path id title/name overview release_date/first_air_date poster_path 
                console.log("get trending successfully")
            }catch(error){
                console.log("get trending failed:", error.response.message)
            }
            
        }
        getTrendingFunc()
    },[content])
    //console.log("trending:", trending) 

    // loading 
    const [isloading, setIsLoading] = useState(true)
    useEffect(()=>{setIsLoading(true)}, [content])
    if (!trending) {  // waiting for the reending info get back
        return(
            <div className='shimmer h-screen w-full'></div>
        )
    }

    return(  // z-index: bg-20 loading-25 info-26 navbar-30 
        <div className='relative bg-black text-white'>
            {/* hero */}
            {/* loading */}
            {isloading && <div className='shimmer absolute top-0 left-0 w-full h-full z-25'>Loading hero</div>}
            {/* hero-main */}
            <div className={`relative  w-full h-screen`}>
                {/* background */}
                <div className='absolute top-0 left-0 w-full h-full'>
                    <img src={ORG_IMG_URL + trending?.poster_path} onLoad={()=> setIsLoading(false)} className='w-full h-full object-cover object-center'/> 
                </div>
                {/* linear-grdient */}
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70 '></div>
                {/* navbar */}
                <Navbar />
                {/* hero-info: set to absolute for center along y */}
                <div className='absolute top-0 left-0 h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 z-26'>
                    <div className='text-6xl font-extrabold'>{content === "movie"? trending?.title: trending?.name}</div>
                    <div className='mt-2 text-md'>{content === "movie"? trending?.release_date : trending?.first_air_date}</div>
                    <div className='mt-4 text-md max-w-3xl'>{trending?.overview.length > 300? trending?.overview.slice(0,300)+"...":trending?.overview}</div>
                    <div className='flex flex-col sm:flex-row mt-5 gap-4'>
                        <Link to={`/media/${trending?.id}`}>
                            <button className='flex gap-2 items-center justify-center text-black bg-white py-2 px-4 rounded-md hover:bg-white/50 cursor-pointer'>
                                <PlayIcon className='size-6 fill-black'/>
                                Play
                            </button>
                        </Link>
                        <Link to={`/media/${trending?.id}`}>
                            <button className='flex gap-2 items-center justify-center bg-gray-400/40 py-2 px-4 rounded-md hover:bg-white hover:text-black cursor-pointer'>
                                <InfoIcon className='size-'/>
                                More info
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* main: category slider */}
            {/* movie category: now_Playing + popular + top_rated + upcoming */}
            {/* tv category: airing_today + popular + top_rated + on_the_air */}
            <div className='flex flex-col items-center justify-center gap-10 py-10 px-5 sm:px-10'>
                {CATEGORY[content].map((category) => {
                    return <Slider type={content} category={category} key={category}/>
                })}
            </div>
        </div>
    )
}

export default HomeScreen