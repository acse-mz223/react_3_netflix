import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/home/HomePage'
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import MediaDetailPage from "./pages/MediaDetailPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  // check user is authed or not --> using the backend middleware protectedRoute
  const {checkauth, IsAuthed, IsCheckingAuth} = useAuthStore()
  useEffect(() => checkauth(),[])
  console.log("IsAuthed:",IsAuthed)
  console.log("IsCheckingAuth:",IsCheckingAuth)

  // loading --> checkAuth is on process
  if (IsCheckingAuth){
    return(
      <div>Loading</div>
    )
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={IsAuthed? <Navigate to={"/"}/>:<LoginPage/>}/>
        <Route path="/signup" element={IsAuthed? <Navigate to={"/"}/>:<SignUpPage/>}/>
        <Route path="/media/:mediaId" element={IsAuthed? <MediaDetailPage />:<Navigate to={"/"}/>} />
        <Route path="/search" element={IsAuthed? <SearchPage />:<Navigate to={"/"}/>} />
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
      {/* footer */}
      <Footer/>
      {/* Toaster */}
      <Toaster/>
    </>
  )
}

export default App
