import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import ChatBox from "./component/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import "./index.css";
import { useState } from "react";
import { assets } from "./assets/assets";
import './assets/prism.css'
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast'
function App() {
  const {user,loadingUser} = useAppContext();    
  const [isMenuOpen, setMenuOpen] = useState(false);
  const {pathname} = useLocation()

  if(pathname==='/loading'||loadingUser ) return  <Loading />

  return (
    <>
     <Toaster />
      {/* Menu icon (only visible when sidebar is closed) */}
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden dark:invert"
          onClick={() => setMenuOpen(true)}
        />
      )}
        {user?(
      <div
        style={{
          background: "linear-gradient(to bottom, #242124, #000000)",
          color: "white",
        }}
      >
        <div className="flex h-screen w-screen">
          <Sidebar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
      ):(
        <div className='bg-gradient-to-b from-[#2421124] to-[#000000] flex
        items-center justify-center h-screen w-screen'>
          
            <Login/>
  
        </div>
      ) }
    </>
  );
}

export default App;
 