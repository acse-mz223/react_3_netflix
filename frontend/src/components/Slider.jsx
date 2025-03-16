import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ORG_IMG_URL, W185_IMG_URL, W500_IMG_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function SliderItem (params){
    if (!params.media.backdrop_path) return null
    return (
        <Link to={`/media/${params.media.id}`}>
            <div className='relative flex flex-col items-center gap-2 min-w-[250px] group '>
                <div className='rounded-md overflow-hidden'>
                    <img className='rounded-md transition-all duration-200 group-hover:scale-150' src={W500_IMG_URL + params.media.backdrop_path} alt="post.png" />
                </div>
                <div className='text-md'>{params.type === "movie"? params.media.title: params.media.name}</div>
            </div>
        </Link>
    )
}

function Slider(params) {
  // get medias
  const [medias, setMedias] = useState()
  useEffect(()=>{
    const getMediaFunc = async ()=>{
        const result =  await axios.get(`/api/${params.type}/${params.category}`)
        setMedias(result.data.content)
      } 
    getMediaFunc()
  },[params])

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
  
  // return 
  return (
    <div className='relative flex flex-col items-start w-full gap-5'>
        <div className='font-extrabold text-2xl'>{params.category.split("_").join(" ")[0].toUpperCase()+ params.category.split("_").join(" ").slice(1)}</div>
        <div className='flex flex-row gap-4 w-full overflow-x-scroll scrollbar-hide' ref={sliderRef} onMouseEnter={()=> setShowArrow(true)} onMouseLeave={()=> setShowArrow(false)}>
            {
                medias?.map((media) => {
                    return <SliderItem media={media} type={params.type} key={media.id}/>
                })
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
  )
}

export default Slider