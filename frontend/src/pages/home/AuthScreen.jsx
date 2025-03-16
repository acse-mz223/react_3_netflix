import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from "lucide-react";

function AuthScreen() {
    // interface
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    // form
    const [formData, setFormData] = useState({
        email:''
    })
    // submit func
    const naviagate = useNavigate()
    const handleSubmitSignUp = (e) =>{
        // navifate to sign up
        e.preventDefault()
        naviagate("/signup?email=" + formData.email)

    }
    const handleSubmitLogIn = () =>{
        // navifate to log in 
        naviagate("/login?email=" + formData.email)
    }
    return (
        <div className='bg-[#232323]'>
            {/* hero */}
            <div className='hero-bg w-full h-screen'>
                <header className='max-w-6xl flex flex-row items-center justify-between mx-auto p-4'>
                    <Link to={"/"}>
                        <img src='netflix-logo.png' alt="netflix-logo" className='w-52'/>
                    </Link>
                    <button onClick={handleSubmitLogIn} className='bg-red-600 px-5 py-2 text-white text-lg rounded-md animate-all duration-10 hover:bg-red-700 cursor-pointer'>Log in</button>
                </header>
                <div className='flex flex-col items-center mt-50 space-y-3 text-white text-center'>
                    <div className='max-w-xl font-extrabold leading-22 text-4xl md:text-6xl'>Unlimited films, TV programmes and more</div>
                    <div className='max-w-2xl px-20  text-lg lg:text-xl lg:font-semibold'>Starts at £5.99. Cancel at any time.</div>
                    <div className='max-w-2xl mt-5 text-lg lg:text-xl font-light '>Ready to watch? Enter your email to create or restart your membership.</div>
                    <form onSubmit={handleSubmitSignUp} className='flex gap-4 flex-col md:flex-row  w-3/7 items-center justify-between'>
                        <div className='w-full mr-2 tabindex="0" px-5 py-1 border  border-gray-400 bg-black/60 rounded-md relative focus-within:ring-1 focus-within:ring-white' style={{cursor: 'text'}} onFocus={()=> setIsEmailFocused(true)} onBlur={()=> {formData.email? null:setIsEmailFocused(false)}}>
                            <label htmlFor='email' className={`text-gray-400 absolute font-extralight left-5 ${isEmailFocused? "text-lg top-2":"text-2xl top-4.5"} transition-all`} >Email address</label>
                            <input type='email' name='email' id="email" className='mt-8 w-full text-xl focus:outline-none' onChange={(event) => {setFormData((pre)=>{return {...pre, [event.target.name] : event.target.value}})}} value={formData.email}></input>
                        </div>
                        <button type='submit' className='flex items-center justify-center text-xl 2xl:text-2xl py-2 2xl:py-4 w-80 2xl:w-85 rounded-md bg-red-600 hover:bg-red-700'>
                            Get Started
                            <ChevronRight className="size-8 2xl:size-10 m-0"/>
                        </button>
                    </form>
                </div>
            </div>
            {/* section 1*/}
            <div className='mt-4 bg-black'>
                <div className='flex flex-col md:flex-row justify-center items-center text-white py-10 px-10 max-w-7xl mx-auto gap-0 md:gap-10'>
                    <div className='flex-1 text-center md:text-left'>
                        <div className='text-3xl md:text-5xl font-bold mb-5'>Enjoy on your TV</div>
                        <div>Watch on Smart TVs, PlayStation, Xbox, Chromcast, Apple TV, Blu-ray players and more</div>
                    </div>
                    <div className='flex-1 relative'>
                        <video src='hero-vid.m4v' autoPlay loop className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-27/50 scale-95 z-10'></video>
                        <img src='tv.png' alt='tv.png' className='ml-auto z-20 relative'></img>
                    </div>
                </div>
            </div>
            {/* section 2*/}
            <div className='mt-4 bg-black'>
                <div className='flex flex-col-reverse md:flex-row justify-center items-center text-white py-10 px-10 max-w-7xl mx-auto gap-0 md:gap-10'>
                    <div className='flex-1 relative'>
                        <img src='stranger-things-lg.png' alt='stranger-things-lg.png' className='ml-auto '></img>
                        <div className='bg-black flex items-center justify-between border border-gray rounded-lg p-3 w-3/5 md:w-4/5 h-1/4 absolute bottom-5 left-1/2 -translate-x-1/2'>
                            <div className='flex h-full gap-3 items-center'>
                                <img src='stranger-things-sm.png' className='h-full'></img>
                                <div className='font-bold'>Stranger Things</div>
                            </div>
                            <img src='download-icon.gif' className='h-full'></img>
                        </div>
                    </div>
                    <div className='flex-1 text-center md:text-left'>
                        <div className='text-3xl md:text-5xl font-bold mb-5'>Download your shows to wahtch offline</div>
                        <div>Save your favorites easily and always have something to watch</div>
                    </div>
                </div>
            </div>        
            {/* section 3*/}
            <div className='mt-4 bg-black'>
                <div className='flex flex-col md:flex-row justify-center items-center text-white py-10 px-10 max-w-7xl mx-auto gap-0 md:gap-10'>
                    <div className='flex-1 text-center md:text-left'>
                        <div className='text-3xl md:text-5xl font-bold mb-5'>Watch everywhere</div>
                        <div>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</div>
                    </div>
                    <div className='flex-1 relative'>
                        <video src='video-devices.m4v' autoPlay loop className='absolute top-1/5 left-1/5 -translate-x-3/20 -translate-y-1/5 scale-75 z-10'></video>
                        <img src='device-pile.png' alt='device-pile.png' className='ml-auto z-20 relative'></img>
                    </div>
                </div>
            </div>        
            {/* section 4*/}
            <div className='mt-4 bg-black'>
                <div className='flex flex-col-reverse md:flex-row justify-center items-center text-white py-10 px-10 max-w-7xl mx-auto gap-0 md:gap-10'>
                    <div className='flex-1 relative'>
                        <img src='kids.png' alt='kids.png' className='ml-auto '></img>
                    </div>
                    <div className='flex-1 text-center md:text-left'>
                        <div className='text-3xl md:text-5xl font-bold mb-5'>Create profiles for kids</div>
                        <div>Send kids on adventures with their favorite characters in a space made just for them-free with your membership.</div>
                    </div>
                </div>
            </div>                            
        </div>
  )
}

export default AuthScreen