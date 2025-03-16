import { Loader, LoaderIcon, LogOutIcon, SearchIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ORG_IMG_URL } from '../utils/constants'
import useContentStore from '../store/content'

function SearchPage() {
    const {logout} = useAuthStore()
    const [selectedType, setSelectedType] = useState("movie")
    const [searchKey, setSearchKey] = useState()
    const [isLoading, setIsLoading] = useState()
    const {content, contentToMovie, contentToTv} = useContentStore()
    // submit
    const [searchReuslt, setSearchReuslt] = useState()
    function handleSearchSubmit() {
        const searchSubmitFunc = async () =>{
            try{
                // input cratria
                if (!searchKey) {
                    toast.error("please input keyword")
                } 
                // search
                console.log("searching...")
                setIsLoading(true)
                const result = await axios.get(`/api/search/${selectedType}/${searchKey}`)
                setSearchReuslt(result.data.result)
                // history fetch
                setShowHistorys(false)
            } catch(error){
                console.log("search failed")
                if (error.response.status === 404) {
                    setSearchReuslt("nofound")
                    toast.error("no things founded. Please change another keyword.")
                }
                else{
                    console.log("search error")
                }
            }finally{
                setIsLoading(false)
                // history
                const historyresult = await axios.get("/api/search/history")
                setHistorys(historyresult.data.content)
            }
        }
        searchSubmitFunc()
    }
    // history 
    const [historys, setHistorys] = useState()
    const [showHistorys, setShowHistorys] = useState(false)
    // const [historySelected, setHistorySelected] = useState()
    useEffect(()=>{
        async function historyFetchFunc(){
            const historyresult = await axios.get("/api/search/history")
            setHistorys(historyresult.data.content)            
        }
        historyFetchFunc()
    },[])

    // result component
    const ResultElement = () =>{
        if (searchReuslt === "nofound") {
            return (
                <div className='text-2xl md:text-4xl font-extrabold text-red-600 w-full flex justify-center items-center mt-10 md:mt-20'>
                    Nothing founded
                </div>
            )
        }
        return (
            <div className='max-x-6xl w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {searchReuslt?.map((result) =>{
                    if (!result.poster_path && !result.profile_path) return null
                    if (selectedType === "person"){
                        return(
                            <div className='bg-gray-800 flex flex-col items-center justify-start gap-4 p-4 h-full' key={result.id}>
                                <img className='max-h-95 rounded-md' src={ORG_IMG_URL + (result.profile_path || result.poster_path) } alt='post img'/>
                                <div className='text-center text-2xl font-bold'>{result.title || result.name}</div>
                            </div>
                        )
                    }
                    else {
                        return(
                            <Link to={`/media/${result.id}`}>
                                <div className='bg-gray-800 flex flex-col items-center justify-start gap-4 p-4 h-full' key={result.id}>
                                    <img className='max-h-95 rounded-md' src={ORG_IMG_URL + (result.profile_path || result.poster_path) } alt='post img'/>
                                    <div className='text-center text-2xl font-bold'>{result.title || result.name}</div>
                                </div>
                            </Link>
                        )
                    }

                })}
            </div>  
        )      
    }

    console.log("search result:", searchReuslt)
    console.log("history result:", historys)

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
            {/* main */}
            <div className='flex flex-col items-center px-5 md:px-20'>
                {/* type */}
                <div className='flex flex-row gap-5 items-center justify-center mb-10 '>
                    <button className={`text-xl px-5 py-2 ${selectedType=== "movie"? 'bg-red-700':'bg-gray-500/40'} hover:bg-red-700 rounded-md cursor-pointer`} onClick={() => {setSelectedType("movie"); contentToMovie()}} >Movie</button>
                    <button className={`text-xl px-5 py-2 ${selectedType=== "tv"? 'bg-red-700':'bg-gray-500/40'} hover:bg-red-700 rounded-md cursor-pointer`} onClick={() => {setSelectedType("tv"); contentToTv()}} >TV</button>
                    <button className={`text-xl px-5 py-2 ${selectedType=== "person"? 'bg-red-700':'bg-gray-500/40'} hover:bg-red-700 rounded-md cursor-pointer`} onClick={() => setSelectedType("person")} >Person</button>
                </div>
                {/* input */}
                <div className='flex flex-row items-center justify-center w-full max-w-4xl gap-4 mb-5'>
                    <input className='w-full p-2 text-xl border border-gray-400 rounded-md ' type='input' placeholder={selectedType} value={searchKey} onChange={(e)=> {setSearchKey(e.target.value)}} onFocus={() => setShowHistorys(true)}></input>
                    <button className={`flex flex-row items-center justify-center gap-2 text-xl px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer`} onClick={handleSearchSubmit} >
                        <SearchIcon className='size-6'/>
                        Search
                    </button>
                </div>
                {/* history -> show when click the inpout, hidden when search successfully + show when search failed */}
                { showHistorys &&
                    <div className='max-w-4xl w-full justify-center md:justify-start flex flex-wrap items-center gap-2'>
                        <div className='text-xl p-2 text-gray-400'>History:</div>
                        {
                            historys?.map((history)=>{
                                return(
                                    <button onClick={() => {setSearchKey(history.content); setSelectedType(history.type)}} className={`flex items-center gap-2 text-lg bg-gray-500/40 px-2 py-2 rounded-md hover:bg-red-600`} key={history.id}>
                                        <div>{history.content}</div>
                                        <div className='text-gray-500'>{history.type}</div>
                                    </button>
                                )
                            })
                        }
                    </div>
                }
                {/* result */}
                {isLoading?
                    <div className='text-red-700 w-full flex justify-center items-center mt-10 md:mt-20 animate-spin'><Loader className='size-12 strokeWidth-2.75' /></div>
                    :<ResultElement/>
                }
            </div>
        </div>
    )
}

export default SearchPage

