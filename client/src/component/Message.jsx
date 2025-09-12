import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Markdown from 'react-markdown'  
import Prism from 'prismjs'
const Message = ({ message }) => {
  useEffect(()=>{
    Prism.highlightAll()
  },[message.content]) 
  return (
    <div>
      {message.role === "user" ? (
        // -------------------------
        <div className='flex item-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609f]/30 rounded-md max-w-2xl'>
            <p className='text-sm text-black'>{message.content}</p>
            <span className='text-xs text-black/60 dark:text-[#B1A6C0]'>{new Date(message.timestamp).toLocaleString()}</span>
          </div>
          <img src={assets.user_icon} alt="" className='w-8 rounded-full' />
        </div>

      )
        // -------------------------------
        : (<div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20
        dark:big-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4'>
          {
            message.isImg ? (
              <img src={message.content} className='w-full max-w-md mt-2 rounded-m d' />
            ) : (
              <div className='text-sm dark:text:text-primary reset-tw'>
                <Markdown>{message.content}</Markdown></div>
            )
          }
          <span>{new Date(message.timestamp).toLocaleString()}</span>
        </div>)
      }
    </div>
  )
}

export default Message