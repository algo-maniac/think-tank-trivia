"use client"
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook} from "react-icons/fa"

const Login = () => {
    return (
        <>
            <div className="w-full h-screen bg-no-repeat bg-cover grid grid-cols-12 bg-[#F6F4EB]">
                <div className="col-span-8 col-start-3 shadow-2xl shadow-gray-700 flex justify-around my-10 mx-auto bg-[#F8F0E5] px-3 py-2 rounded-lg">
                    <div className="left px-3 py-2 border-gray-500 shadow-2xl w-3/4 mx-3 my-3 bg-[#F0F0F0]">
                        <h1 className="text-2xl font-bold text-center text-black">Login</h1>
                        <hr className="w-24 h-1 my-2 mx-auto bg-purple-700 text-center" />
                        <p className="text-center first-letter:text-2xl"><span className='text-black'>Doesn't have an account yet ? </span><span class="cursor-pointer font-bold underline text-purple-700 hover:text-purple-900">Sign Up</span></p>
                        <form action="#">
                            <div className="my-3 mt-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                <input type="email" id="email"
                                    className="bg-white-50 shadow-2xl shadow-purple-200 text-black text-sm rounded-lg focus:outline-purple-700 block w-full p-2.5"
                                    placeholder="andrewtate140@gmail.com" required />
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900">
                                        Password</label>
                                    <p className="text-sm cursor-pointer underline text-purple-900 hover:text-purple-700">Forgot Passowrd?</p>
                                </div>
                                <input type="password" id="password"
                                    className="bg-gray-50 shadow-2xl shadow-purple-200 text-black text-md rounded-lg focus:outline-purple-700 block w-full p-2.5 "
                                    placeholder="••••••••••••••••••" required />
                            </div>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value=""
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-cyan-950"
                                        required />
                                </div>
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-600">Remember
                                    me</label>
                            </div>
                            <button type="submit" className="text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">LOGIN</button>
                            <div className="flex justify-center my-2">
                                <hr className="w-20 h-px my-4 mr-3 bg-purple-500" />
                                <span className="font-bold text-purple-950">or login with</span>
                                <hr className="w-20 h-px my-4 ml-3 bg-purple-500" />
                            </div>
                            <div className="flex justify-around">
                                <button className='text-3xl'><FcGoogle /></button>
                                <button className='text-3xl bg-blue-950 rounded-full '><FaFacebook /></button>
                            </div>
                        </form>
                    </div>
                    <div class="border-2 w-2 h-3/4  bg-purple-500 my-auto"></div>
                    <div class="right flex flex-col justify-center items-center px-3 py-3">
                        <div className=''><img src="./login2.svg" alt="errorLoading" /></div>                        
                    </div>

                </div>
            </div>
        </>
    )
}
export default Login;