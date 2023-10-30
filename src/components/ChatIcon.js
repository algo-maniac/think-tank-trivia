"use client";
import React, { useState } from 'react'
import ChatComponent from './ChatComponent';
import "./ChatStyle.css"

const ChatIcon = () => {

    const [changeColor, setChangeColor] = useState(false);

    const handleClick = () => {
        setChangeColor(!changeColor);
    }

    return (
        <>
            {/* <div className={`ChatBox bg-blue-600 w-72 h-56 fixed right-12 bottom-16 ${(changeColor == true) ? "opacity-0" : "opacity-100"}`}>
                <div className='border border-red-700 '>
                    <ChatBox />
                </div>
            </div> */}
            <div className={`w-[27%] fixed right-16 bottom-10 border-2 rounded-lg border-purple-500 ${(changeColor == true) ? "opacity-100" : "opacity-0"}`}>
                <div className='chat bg-white p-2 border border-white overflow-y-scroll h-[26rem] w-full z-10'>
                    {/* <h1 className='text-center py-2 text-xl font-bold text-black'>CHAT-BOT</h1> */}

                    <div className='w-24 mx-20'>
                        <img src="./chatbotLogo.svg" alt="" />
                    </div>
 
                    <ChatComponent />
                   
                </div>
            </div>
            <button onClick={handleClick} className='p-2 mx-2 fixed right-2 bottom-4 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-green-500 hover:to-blue-600 hover:inline-block hover:text-transparent hover:bg-clip-text rounded-lg bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text border-2 border-violet-500 font-bold'>Chat-Bot</button>
        </>
    )
}

export default ChatIcon;