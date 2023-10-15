"use client";
import React from 'react'
import "./ChatStyle.css"

import { useChat } from 'ai/react';
const ChatComponent = () => {

    const { input, messages, handleInputChange, handleSubmit, isLoading } = useChat()
    // console.log("input : ", input);
    // console.log("message : ", messages);
    return (
        <>
            {messages.map((message) => {
                return (
                    <div key={message.id}>
                        {
                            message.role == "assistant" ?
                                <h1 className='my-2 font-bold text-purple-700'>• bot</h1>
                                :
                                <h1 className='my-2 font-bold text-purple-700'>• user</h1>
                        }
                        {
                            message.content.split("\n").map((currentText, index) => {
                                if (currentText == "") {
                                    return <p key={message.id + index}>&nbsp;</p>
                                } else {
                                    {/* return <p key={message.id + index}>{currentText}</p> */ }
                                    return <div className='bg-purple-700 text-white p-2 border rounded-lg border-green-400 w-full'>{currentText}</div>
                                }
                            })
                        }
                    </div>
                )
            })}

            <form className='my-2 mt-16' action="" onSubmit={handleSubmit}>
                {/* <div className='border border-red-500 flex justify-start'>
                    <div className='bg-white text-black p-2 border rounded-lg border-green-400 w-1/2'>sending message from chatgpt</div>
                </div>
                <div className='border border-red-500 flex justify-end my-2'>
                    <div className='bg-white text-black p-2 border rounded-lg border-green-400 w-1/2'>receiving message from chatgpt</div>
                </div> */}
                {/* <h1 className='font-bold text-xl text-center'>CHAT-BOT</h1> */}
                <p className='font-bold text-purple-700'>⁂ Type your question</p>
                <div className='flex '>
                    <textarea
                        className='w-full bg-purple-700 p-2 my-2 text-white focus:outline-gray-300'
                        rows={2}
                        placeholder='send your message'
                        value={input}
                        onChange={handleInputChange}>
                    </textarea>
                    <div className='my-auto'>
                        <button><img src="sendIcon.png" alt="" /></button>
                    </div>
                </div>
                {/* <div className='flex justify-center'><button className='bg-purple-700 p-2 rounded-lg'>Send</button></div> */}
            </form>
        </>
    )
}

export default ChatComponent