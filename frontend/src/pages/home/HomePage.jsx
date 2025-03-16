import React, { useEffect } from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../store/authUser'

function HomePage() {
  const {IsAuthed, user} = useAuthStore()
  console.log("User:",user)
  return (
    <div>
        {IsAuthed?<HomeScreen/>:<AuthScreen/>}
    </div>
  )
}

export default HomePage