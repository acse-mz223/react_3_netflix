import React, { useEffect, useState } from 'react'
import { Form, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

function SignUpPage() {
  // interface
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isUsernameFocused, setIsUsernameFocused] = useState(false)
  // form
  let infor = new URL(window.location.href); 
  let email = infor.searchParams.get("email"); 
  useEffect(() =>{
    if (email) {setIsEmailFocused(true)}
  },[])
  const [formData, setFormData] = useState({
    email: email || '',
    username:"",
    password:""
  })

  // submit
  const {signup} = useAuthStore()
  const submit = (event) =>{
    event.preventDefault()
    signup({...formData})
  }

  // handleNav
  const navigate = useNavigate()
  const handleNav = () =>{
    navigate("/login?email=" + formData.email)
  }
  return (
    <div className='relative hero-bg h-screen w-full'>
        <header className='absolute left-10 top-5  max-w-6xl flex flex-row items-center justify-between p-4 z-50'>
            <Link to={"/"}>
                <img src='netflix-logo.png' alt="netflix-logo" className='w-46'/>
            </Link>
        </header>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-black/75 rounded-md p-18 mt-10 flex flex-col justify-center items-center shadow-md space-y-6'>
            <h1 className='font-semibold text-white text-4xl mb-12 '>Sign Up</h1>
            <form className='space-y-6 w-full' onSubmit={submit}>
                <div className='tabindex="0" px-5 py-2 border border-gray-600 bg-white/3 rounded-md relative focus-within:ring-1 focus-within:ring-white' style={{cursor: 'text'}} onFocus={()=> setIsEmailFocused(true)} onBlur={()=> {formData.email? null:setIsEmailFocused(false)}}>
                    <label htmlFor='email' className={`text-gray-400 absolute font-extralight left-5 ${isEmailFocused? "text-lg top-1":"text-xl top-5"} transition-all`} >Email address</label>
                    <input type='email' name='email' id="email" className='mt-6 w-full text-white text-xl focus:outline-none' onChange={(event) => {setFormData((pre)=>{return {...pre, [event.target.name] : event.target.value}})}} value={formData.email}></input>
                </div>
                <div className='tabindex="0" px-5 py-2 border border-gray-600 bg-white/3 rounded-md relative focus-within:ring-1 focus-within:ring-white' style={{cursor: 'text'}} onFocus={()=> setIsUsernameFocused(true)} onBlur={()=> {formData.username? null:setIsUsernameFocused(false)}}>
                    <label htmlFor='username' className={`text-gray-400 absolute font-extralight left-5 ${isUsernameFocused? "text-lg top-1":"text-xl top-5"} transition-all`} >Username</label>
                    <input type='input' name='username' id="username" className='mt-6 w-full text-white text-xl focus:outline-none' onChange={(event) => {setFormData((pre)=>{return {...pre, [event.target.name] : event.target.value}})}} value={formData.username}></input>
                </div>
                <div className='tabindex="0" px-5 py-2 border border-gray-600 bg-white/3 rounded-md relative focus-within:ring-1 focus-within:ring-white' style={{cursor: 'text'}} onFocus={()=> setIsPasswordFocused(true)} onBlur={()=> {formData.password? null:setIsPasswordFocused(false)}}>
                    <label htmlFor='password' className={`text-gray-400 absolute font-extralight left-5 ${isPasswordFocused? "text-lg top-1":"text-xl top-5"} transition-all`} >Password</label>
                    <input type='password' name='password' id="password" className='mt-6 w-full text-white text-xl focus:outline-none' onChange={(event) => {setFormData((pre)=>{return {...pre, [event.target.name] : event.target.value}})}} value={formData.password}></input>
                </div>
                <button type='submit' className='bg-red-600 text-white text-xl font-light py-3 w-full rounded-sm text-center animate-all duration-400 hover:bg-red-700 cursor-pointer' >Sign up</button>
                <p className='text-gray-400 flex justify-center text-xl font-light '>OR</p>
                <button type="button" onClick={handleNav} className='bg-white/20 text-white text-xl font-light py-3 w-full rounded-sm text-center animate-all duration-400 hover:bg-white/15 cursor-pointer'>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default SignUpPage