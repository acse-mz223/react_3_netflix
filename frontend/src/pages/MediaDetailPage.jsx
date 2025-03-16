import { ArrowLeft, ArrowRight, LogOutIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import axios from 'axios'
import useContentStore from '../store/content'
import { ORG_IMG_URL, VIDEO_URL } from '../utils/constants'
import ReactPlayer from 'react-player'
import { SliderItem } from '../components/Slider'


function MediaDetailPage() {
    // params
    const {mediaId} = useParams()
    const {logout} = useAuthStore()
    const {content} = useContentStore()
    // loading
    const [isLoading, setIsLoading] = useState(false)
    // arrow 
    const [showArrow, setShowArrow] = useState(false)
    const sliderRef = useRef()
    const scrollLeft = () =>{
        sliderRef.current.scrollBy({
            left: - sliderRef.current.offsetWidth,
            behavior: "smooth"
        })
    }
    const scrollRight = () =>{
        sliderRef.current.scrollBy({
            left: sliderRef.current.offsetWidth,
            behavior: "smooth"
        })
    }    
    // fetch search info 
    const [mediaSearchDetail, setMediaSearchDetail] = useState()
    const [mediaSearchSimilar, setMediaSearchSimilar] = useState()
    const [mediaSearchTrailer, setMediaSearchTrailer] = useState()
    // fetch
    useEffect(()=>{
        async function mediaSearchFunc() {
            try{
                setIsLoading(true)
                const resultDetail = await axios.get(`/api/${content}/${mediaId}/details`)
                const resultSimilar = await axios.get(`/api/${content}/${mediaId}/similars`)
                const resultTrailer = await axios.get(`/api/${content}/${mediaId}/trailers`)
                setMediaSearchDetail(resultDetail.data.content)
                setMediaSearchSimilar(resultSimilar.data.content)
                setMediaSearchTrailer(resultTrailer.data.content)
            } catch(error){
                console.log("media info fetch failed")
                setMediaSearchDetail("none")
            } finally{
                setIsLoading(false)
            }
            
        }
        mediaSearchFunc()
    },[mediaId, content])
    console.log("search_detail:", mediaSearchDetail)
    console.log("search_similar:", mediaSearchSimilar)
    console.log("search_trailer:", mediaSearchTrailer)
    // 404 -- as loading and unfound may interact. Here use none as label to identify no source founded
    if (mediaSearchDetail === "none"){
        return (
            <div className='w-full h-screen flex flex-col gap-5 justify-center items-center bg-black text-white'>
                <div className='text-5xl font-bold'>404 Source not found</div>
                <Link to={"/"} className='hover:text-blue-800 hover:underline text-3xl font-semibold'>Back to HomePage</Link>
            </div>
        )
    }
    // loading 
    if(isLoading){
        return (
            <div className='w-full h-screen shimmer z-100'></div>
        )
    }

    return (
        <div className='bg-black text-white min-h-screen'>
            {/* narbar */}
            <header className='max-w-6xl flex flex-row items-center justify-between mx-auto p-8'>
                <div className='flex gap-10 items-center justify-start relative'>
                    <Link to={"/"}>
                        <img src='/netflix-logo.png' alt="netflix-logo" className='w-40 sm:w-52'/>
                    </Link>
                    {/* desktop */}
                    {/* <div className='flex gap-8 text-xl'>
                        <div onClick={contentToMovie} className='hover:underline cursor-pointer'>Movies</div>
                        <div onClick={contentToTv} className='hover:underline cursor-pointer'>Tv</div>
                    </div> */}
                </div>
                <div className='flex gap-8 items-center '>
                    <Link to="/search">
                        <SearchIcon className='size-6 hover:text-gray-400 cursor-pointer' />
                    </Link>
                    <img src='/avatar1.png' alt='avatar' className='size-8 rounded-md'/>
                    <LogOutIcon onClick={logout} className='size-6 cursor-pointer hover:text-gray-400'/>
                </div>
            </header>
            {/* trailer */}
            <div className='flex justify-center w-full '>
                {
                    isLoading? <div className='w-full h-[70vh] shimmer'></div>:
                    mediaSearchTrailer && mediaSearchTrailer.length? <ReactPlayer width="100%" height="70vh" url={VIDEO_URL[mediaSearchTrailer[0]?.site] + mediaSearchTrailer[0]?.key}/>:
                    <div className='font-bold text-2xl'>No trailers</div>
                }
            </div>
            {/* detail */}
            <div className='max-w-6xl flex flex-col md:flex-row items-center justify-between gap-5 md:gap-20 mx-auto px-5 md:px-20 mt-10 md:mt-20'>
                <div className='flex-2 flex flex-col justify-center gap-1'>
                    <div className='text-2xl md:text-4xl font-extrabold text-center md:text-left'>{mediaSearchDetail?.title || mediaSearchDetail?.name}</div>
                    <div className='text-md md:text-xl mb-2 text-center md:text-left'>{mediaSearchDetail?.release_date || mediaSearchDetail?.first_air_date}</div>
                    <div className='text-md md:text-xl text-center md:text-left'>{mediaSearchDetail?.overview}</div>
                </div>
                <div className='flex-1'>
                    <img className='rounded-md'  src={ORG_IMG_URL + mediaSearchDetail?.poster_path} alt='post_img'/>
                </div>
            </div>
            {/* similar */}
            <div className='relative mx-auto flex flex-col items-start w-full gap-5 px-5 md:px-15 mt-10 md:mt-20'>
                <div className='font-extrabold text-2xl'>Similars</div>
                <div className='flex flex-row gap-4 w-full overflow-x-scroll scrollbar-hide' ref={sliderRef} onMouseEnter={()=> setShowArrow(true)} onMouseLeave={()=> setShowArrow(false)}>
                    {   
                        mediaSearchSimilar? 
                        mediaSearchSimilar.map((media) => {
                            return <SliderItem media={media} type={content} key={media.id}/>
                        }):
                        <div className='text-md text-gray-400'>Ops! No resources</div>
                    }
                    {
                        showArrow && (
                            <>
                            <div className='absolute left-4 top-4/7 -translate-y-1/2 text-white bg-white/10 hover:bg-white/40 p-3 rounded-full cursor-pointer' onClick={scrollLeft}> <ArrowLeft className='size-6' /> </div>
                            <div className='absolute right-4 top-4/7 -translate-y-1/2 text-white bg-white/10 hover:bg-white/40 p-3 rounded-full cursor-pointer' onClick={scrollRight}> <ArrowRight className='size-6' /> </div>
                            </>
                        )
                    }    
                </div>    
            </div>
        </div>
    )
}

export default MediaDetailPage