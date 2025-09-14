import { createContext, useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { dummyChats } from "../assets/assets";
import { dummyUserData } from "../assets/assets";
import axios from 'axios';
import toast from "react-hot-toast";
const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
 
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, settheme] = useState(localStorage.getItem("theme") || "light");
  const [token,setToken] = useState(localStorage.getItem('token')||null);
  const [loadingUser,setLoadingUser] = useState(true)
  // Temporary dummy data (replace with backend later)

  const fetchUser = async () => {
    // setUser(dummyUserData);
    try{
    const{data} = await axios.get('/api/user/data',{headers:{Authorization:token}})
       
     if(data.success){
       setUser(data.user);
     }
     else{
      toast.error(data.message)
     }
    }catch(error){
      toast.error(error.message)
    }finally{
      setLoadingUser(false)
    }
  };
  //------------------
  const createNewChat = async()=>{
      try{
        if(!user) return toast('Login to create a new Chat')
          navigate('/')
         await axios.get('/api/chat/create',{headers:{Authorization:token}})
        
        await fetchUserChats()
      }catch(error){
        toast.error(error.message)
      }
  }

  const fetchUserChats = async () => {
    try{
       const {data} = await axios.get('/api/chat/get',{headers:{Authorization:token}})
    

      if(data.success){
        setChats(data.chats)
        //if the user has chats,create one 
        if(data.chats.length===0){
            await createNewChat();
            return fetchUserChats();
        }else{
          setSelectedChat(data.chats[0])
        }
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  useEffect(() => {
    if(token){
     fetchUser()
    }else{
      setUser(null);
      setLoadingUser(false);
    }
    
  }, [token]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    settheme,
    createNewChat,
    loadingUser,
    fetchUserChats,
    token,
    setToken,
    axios

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
