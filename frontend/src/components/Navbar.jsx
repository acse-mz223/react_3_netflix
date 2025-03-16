import React from 'react'
import { Link } from 'react-router-dom'
import useContentStore from '../store/content'
import { useAuthStore } from '../store/authUser'
import { LogOutIcon, SearchIcon } from 'lucide-react'

function Navbar() {
    const {content, contentToMovie, contentToTv} = useContentStore()
    const {logout} = useAuthStore()
    return (
        <div className='relative z-30 '>
            <header className='max-w-6xl flex flex-row items-center justify-between mx-auto p-8'>
                <div className='flex gap-10 items-center justify-start relative'>
                    <Link to={"/"}>
                        <img src='netflix-logo.png' alt="netflix-logo" className='w-40 sm:w-52'/>
                    </Link>
                    {/* desktop */}
                    <div className='flex gap-8 text-xl'>
                        <div onClick={contentToMovie} className={`hover:underline cursor-pointer ${content==="movie"? 'underline':null}`}>Movies</div>
                        <div onClick={contentToTv} className={`hover:underline cursor-pointer ${content==="tv"? 'underline':null}`}>Tv</div>
                    </div>
                </div>
                <div className='flex gap-8 items-center '>
                    <Link to="/search">
                        <SearchIcon className='size-6 hover:text-gray-400 cursor-pointer' />
                    </Link>
                    <img src='avatar1.png ' alt='avatar' className='size-8 rounded-md'/>
                    <LogOutIcon onClick={logout} className='size-6 cursor-pointer hover:text-gray-400'/>
                </div>
            </header>
        </div>
    )
}

export default Navbar