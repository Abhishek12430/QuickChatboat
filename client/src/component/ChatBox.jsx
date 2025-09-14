import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme,user,axios,token,setUser } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setPublished] = useState(false);

  const onSubmit = async (e) => {
    if (!prompt.trim()) return;
   try{
    e.preventDefault();
    if(!user) return toast('Login to send message')
      setLoading(true);
    const promptCopy = prompt
    setPrompt('')
    setMessages(prev=>[...prev,{role:'user',content:prompt,timestamp:Date.now(),isImage:false}])
    const{data} = await axios.post(`/api/message/${mode}`,{chatId:selectedChat._id,prompt,isPublished},{headers:{Authorization:token}})

    if(data.success){
    setMessages(prev=>[...prev,data.reply])
     if(mode==='image'){
      setUser(prev =>({...prev,credits:prev.credits-2}))
     }else{
      setUser(prev =>({...prev,credits:prev.credits-1}))
     }
    }else{
      toast.error(data.message)
      setPrompt(promptCopy)
    }
   }catch(error){
  toast.error(error.message)
   }finally{
    setPrompt('')
    setLoading(false)
   }
  };

  // Load chat messages when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      {/* Chat messages area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto mb-5 pr-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={assets.logoss_full_dark}
              alt="logo"
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl sm:text-center text-gray-400 dark:text-white">
              Ask me anything
            </p>
          </div>
        ) : (
          messages.map((msg, index) => <Message key={index} message={msg} />)
        )}

        {/* Three dots loading indicator */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce delay-150"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce delay-300"></div>
          </div>
        )}
      </div>

      {/* Publish checkbox (only in image mode) */}
      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">
            Publish Generated Image to Community
          </p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Input box (stays fixed at bottom) */}
      <form
        onSubmit={onSubmit}
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 
                   rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
      >
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm pl-3 pr-2 outline-none bg-transparent dark:text-white text-black"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your prompt here..."
          className="flex-1 w-full text-sm outline-none bg-transparent dark:text-white text-black"
          required
        />

        <button type="submit" disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt="send"
            className="w-8 cursor-pointer"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
