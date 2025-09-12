import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";

const Sidebar = ({ isMenuOpen, setMenuOpen }) => {
  const { chats = [], setSelectedChat, theme, settheme, user, navigate } =
    useAppContext();
  const [search, setSearch] = useState("");

  const toggleTheme = () => {
    settheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b
     from-[#242124]/30 to-[#000000]/30 border-r border-[#80699F]/30 backdrop-blur-3xl
      transition-all duration-500 max-md:absolute left-0 z-10 ${
        !isMenuOpen && "max-md:-translate-x-full"
      }`}
    >
      {/* --- Top Content --- */}
      <div className="flex flex-col gap-6 flex-1 overflow-hidden">
        {/* logo */}
        <div className="p-[3px] rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 w-fit">
          <img
            src={theme === "dark" ? assets.logo_full : assets.logoss_full_dark}
            alt="logo"
            className="w-full max-w-59"
          />
        </div>

        {/* New chat button */}
        <button className="flex justify-center items-center w-full py-2 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer">
          <span className="mr-2 text-xl">+</span>New Chat
        </button>

        {/* search */}
        <div className="flex items-center gap-2 p-3 border border-gray-400 dark:border-white/20 rounded-md">
          <img src={assets.search_icon} alt="" className="w-4 dark:invert" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search conversations"
            className="text-xs placeholder:text-gray-400 outline-none bg-transparent"
          />
        </div>

        {/* chats (scrollable only) */}
        <div className="flex-1 overflow-y-auto mt-2 pr-1">
          {chats.length > 0 && <p className="text-sm">Recent Chats</p>}
          <div className="space-y-2">
            {chats
              .filter(
                (chat) =>
                  chat.name?.toLowerCase().includes(search.toLowerCase()) ||
                  (chat.messages?.[0]?.content?.toLowerCase() || "").includes(
                    search.toLowerCase()
                  )
              )
              .map((chat) => (
                <div 
                  key={chat._id}
                  className="group flex justify-between items-center p-2 border-b border-gray-300 dark:border-gray-700 cursor-pointer"
                  onClick={() => {setSelectedChat(chat); navigate('/');setMenuOpen(false)}}
                >
                  <div>
                    <p className="text-sm font-medium">
                      {chat.messages?.length > 0
                        ? chat.messages[0]?.content.slice(0, 32)
                        : chat.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {moment(chat.updatedAt).fromNow()}
                    </p>
                  </div>
                  <img
                    src={assets.bin_icon}
                    alt="delete"
                    className="hidden group-hover:block w-4 cursor-pointer dark:invert"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Content --- */}
      <div className="flex flex-col gap-3 mt-6">
        {/* Community */}
        <div
          onClick={() => {navigate("/community");setMenuOpen(false)}}
          className="flex items-center gap-2 p-3 border border-gray-300 
          dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
        >
          <img src={assets.gallery_icon} alt="" className="w-4.5 dark:invert" />
          <p className="text-sm">Community Images</p>
        </div>

        {/* Credits */}
        <div
          onClick={() => {navigate("/credits");setMenuOpen(false)}}
          className="flex items-center gap-2 p-3 border border-gray-300 
          dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
        >
          <img
            src={assets.diamond_icon}
            alt=""
            className="w-4.5 dark:invert"
          />
          <div className="flex flex-col text-sm">
            <p>Credits: {user?.credits}</p>
            <p className="text-xs text-gray-500">
              Purchase credits to use QuickChatBoat
            </p>
          </div>
        </div>

        {/* User Account */}
        <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
          <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
          <p className="flex-1 text-sm dark:text-primary truncate">
            {user ? user.name : "Login your account"}
          </p>
          {user && (
            <img
              src={assets.logout_icon}
              className="h-5 cursor-pointer hidden dark:invert group-hover:block"
              alt="logout"
            />
          )}
        </div>
      </div>

      {/* Close button for mobile */}
      <img
        onClick={() => setMenuOpen(false)}
        src={assets.close_icon}
        alt=""
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden dark:invert"
      />
    </div>
  );
};

export default Sidebar;
  