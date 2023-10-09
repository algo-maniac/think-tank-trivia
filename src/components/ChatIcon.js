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
            <div className={`w-[27%] fixed right-16 bottom-16 border-2 rounded-lg border-purple-500 ${(changeColor == true) ? "opacity-100" : "opacity-0"}`}>
                <div className='chat bg-white p-2 border border-white overflow-y-scroll h-[28rem] w-full'>
                    {/* <h1 className='text-center py-2 text-xl font-bold text-black'>CHAT-BOT</h1> */}

                    <div className='w-24 mx-20'>
                        <img src="./chatbotLogo.svg" alt="" />
                    </div>

                    <ChatComponent />
                   
                </div>
            </div>
            <button onClick={handleClick} className='bg-purple-700 p-2 mx-2 fixed right-2 bottom-4 hover:bg-purple-900 text-white rounded-lg'>chatbot</button>
        </>
    )
}

export default ChatIcon;