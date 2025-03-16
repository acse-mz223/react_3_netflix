import React from 'react'
import { useNavigate } from 'react-router-dom'


function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className='relative w-full h-screen text-white'>
      <div className='absolute w-full h-full top-0 left-0'>
        <img className='w-full h-full object-cover' src='404.png' alt='404.png' />
      </div>
      <div className='absolute w-full h-full top-0 left-0 notfound-bg'>
      </div>
      <div className='absolute w-full h-full top-0 left-0 flex p-5 md:p-20 flex-col justify-center items-center'>
        <div className='text-6xl md:text-8xl tracking-wide mb-5 text-center'>Page not found</div>
        <div className='text-2xl tracking-wide mb-5 max-w-4xl font-light text-center'>Sorry, we cant find the page. You can explore home page to find more infos.</div>
        <button className='px-6 py-2 text-black text-xl bg-white tracking-wide rounded-md hover:bg-black hover:text-white' onClick={()=> navigate("/")}>Home</button>
      </div>
    </div>
  )
}

export default NotFoundPage