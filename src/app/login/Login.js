"use client"
import React, { useReducer } from 'react'

import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import Link from 'next/link'


import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { loginSchema } from '@/models/loginSchema'

const initialValues = {
    email: "",
    password: "",
}

const Login = () => {

    const { errors, values, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (value, action) => {
            //changed by Tonmoy for LOGIN..................
            // console.log(value);
            // value={email , password}
            const result=await signIn('credentials',{redirect:false,email:value.email,password:value.password});
            // console.log(result);
            if(!result.ok){//means authentication failed or invalid credentials
                alert("Wrong credentials");
            }
            action.resetForm();
        }
    })
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-8 col-start-3 shadow-md shadow-gray-300 flex justify-around my-5 mx-auto bg-[#F8F0E5] px-3 py-2 rounded-lg">
                    <div className="left px-3 py-2 shadow-md shadow-gray-300 w-3/4 mx-3 my-3 bg-[#F0F0F0]">
                        <h1 className="text-2xl font-bold text-center text-black">Login</h1>
                        <hr className="w-24 h-1 my-2 mx-auto bg-purple-700 text-center" />
                        <p className="text-center first-letter:text-2xl"><span className='text-black'>Doesn't have an account yet ? </span><span className="cursor-pointer font-bold underline text-purple-700 hover:text-purple-900"><Link href="/signup"> Sign Up</Link></span></p>
                        <form action="#" className='flex flex-col justify-center ' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 mt-3">Email Address</label>
                                <div className="flex my-1">
                                    <span className="inline-flex items-center px-3 text-md text-gray-900 bg-gray-300 rounded-l-md">
                                        <MdEmail />
                                    </span>
                                    <input className={`rounded-none rounded-r-lg bg-gray-200 border border-gray-300  focus:outline-purple-900  text-gray-900 block  w-full text-sm p-2.5 ${errors.email && touched.email ? "border-2 border-red-600 rounded-l-md" : ""} `}
                                        placeholder="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                { errors.email && touched.email ? <p className='text-red-600 text-xs'>{errors.email}</p> : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mt-3">
                                    Password</label>
                                <div className="flex my-2">
                                    <span className="inline-flex items-center px-3 text-md text-gray-900 bg-gray-300 rounded-l-md">
                                        <RiLockPasswordFill />
                                    </span>
                                    <input className={`rounded-none rounded-r-lg bg-gray-200 border border-gray-300  focus:outline-purple-900  text-gray-900 block  w-full text-sm p-2.5 ${errors.password && touched.password ? "border-2 border-red-600 rounded-l-md" : ""} `}
                                        placeholder="password"
                                        type="password"
                                        id="password"
                                        name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                { errors.password && touched.password ? <p className='text-red-600 text-xs '>{errors.password}</p> : null}
                            </div>

                            <div className='flex space-x-3'>
                                <div className="flex items-start mb-6">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value=""
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-cyan-950"
                                            required />
                                    </div>
                                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-600">Remember
                                        me</label>
                                </div>
                                <p className="text-xs cursor-pointer underline text-purple-900 hover:text-purple-700">Forgot Passowrd?</p>
                            </div>
                            <button type="submit" className="text-white bg-purple-700 hover:bg-purple-600 focus:ring-2 focus:outline-none focus:ring-purple-900 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center ">LOGIN</button>
                            <div className="flex justify-center my-2">
                                <hr className="w-20 h-px my-4 mr-3 bg-purple-500" />
                                <span className="font-bold text-purple-950">or login with</span>
                                <hr className="w-20 h-px my-4 ml-3 bg-purple-500" />
                            </div>
                            <div className="flex justify-around space-x-14">
                                <button className='text-3xl' onClick={()=>{signIn("google")}}><FcGoogle /></button>
                                <button className='text-3xl bg-white rounded-full ' onClick={()=>{signIn("github")}}><FaGithub /></button>
                            </div>
                        </form>
                    </div>
                    {/* <div class="border-2 w-2 h-3/4  bg-purple-700 my-auto"></div> */}
                    <div className="right flex justify-center items-center px-1 py-1">
                        <div>
                            {/* <Lottie className='w-72' animationData={LoginAnimation} /> */}
                            <img src="./login2.svg" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Login;