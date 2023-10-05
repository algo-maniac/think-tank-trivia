"use client"
import React from 'react'
import "./signupStyle.css"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { BiSolidUser } from "react-icons/bi"
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { useFormik } from 'formik'
import Link from 'next/link'


import SignUp from "./SignUp.json"
import Lottie from 'lottie-react'
import { signupSchema } from '@/models/singupSchema'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'


const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
}

const Signup = () => {
    const {status}=useSession();
    const router=useRouter();

    if(status==='authenticated'){
        router.replace("/");
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        onSubmit: async(value,action) => {
            // console.log(value);
            const result=await fetch("/api/signup",{
                method:"POST",
                header:{
                    "Content-Type":"applications/json"
                },
                body:JSON.stringify(value)
            })
            const data=await result.json();
            alert(data.message);
            action.resetForm();
        }
    })

    // console.log(errors);

    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-8 col-start-3 shadow-md shadow-gray-300 flex justify-around my-2 mx-auto bg-[#F8F0E5] px-3 py-2 rounded-lg space-x-3">
                    <div className="left flex justify-center items-center px-3 py-3 my-3">
                        <div className='w-3/4'>
                            {/* <Lottie animationData={SignUp} /> */}
                            <img src="./signup2.svg" alt="" />
                        </div>
                    </div>
                    {/* <div className="border-2 w-2 h-3/4  bg-purple-500 my-auto"></div> */}
                    <div className="right px-4 py-2 shadow-md shadow-gray-300 w-3/4 mx-1 my-1 bg-[#F0F0F0]">
                        <h1 className="text-2xl font-bold text-center text-black">Signup</h1>
                        <hr className="w-24 h-1 my-2 mx-auto bg-purple-700 text-center" />
                        <p className="text-center first-letter:text-2xl"><span className='text-black'>Already have an account ? </span><span className="cursor-pointer font-bold underline text-purple-700 hover:text-purple-900"><Link href='/login'> Login</Link></span></p>
                        <form action="#" className='flex flex-col justify-center' onSubmit={handleSubmit}>
                            {/* <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-900 "></label> */}
                            <div className='flex flex-col my-1'>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-md text-gray-900 bg-gray-300 rounded-l-md">
                                        <BiSolidUser />
                                    </span>
                                    <input className={`rounded-none rounded-r-lg bg-gray-200 border border-gray-300  focus:outline-purple-900  text-gray-900 block  w-full text-sm p-2.5 ${errors.name && touched.name ? "border-2 border-red-600 rounded-l-md" : ""} `}
                                        placeholder="name"
                                        type="text"
                                        id="name"
                                        name='name'
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                { errors.name && touched.name ? <p className='text-red-600 text-xs'>{errors.name}</p> : null}
                            </div>
                            <div className='flex flex-col my-1'>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-md text-gray-900 bg-gray-300 rounded-l-md">
                                        <BiSolidUser />
                                    </span>
                                    <input className={`rounded-none rounded-r-lg bg-gray-200 border border-gray-300  focus:outline-purple-900  text-gray-900 block  w-full text-sm p-2.5 ${errors.username && touched.username ? "border-2 border-red-600 rounded-l-md" : ""} `}
                                        placeholder="username"
                                        type="text"
                                        id="username"
                                        name='username'
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                { errors.username && touched.username ? <p className='text-red-600 text-xs'>{errors.username}</p> : null}
                            </div>
                            <div className='flex flex-col my-1'>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-md text-gray-900 bg-gray-300 rounded-l-md">
                                        <MdEmail />
                                    </span>
                                    <input className={`rounded-none rounded-r-lg bg-gray-200 border border-gray-300  focus:outline-purple-900  text-gray-900 block  w-full text-sm p-2.5 ${errors.email && touched.email ? "border-2 border-red-600 rounded-l-md" : ""} `}
                                        placeholder="email"
                                        type="email"
                                        id="email"
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                { errors.email && touched.email ? <p className='text-red-600 text-xs'>{errors.email}</p> : null}
                            </div>
                            <div className='flex flex-col my-1'>
                                <div className="flex">
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
                                { errors.password && touched.password ? <p className='text-red-600 text-xs'>{errors.password}</p> : null}
                            </div>

                            <div className='flex flex-col my-1'>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-md text-gray-900 bg-gray-300 rounded-l-md">
                                        <RiLockPasswordFill />
                                    </span>
                                    <input className={`rounded-none rounded-r-lg bg-gray-200 border border-gray-300  focus:outline-purple-900  text-gray-900 block  w-full text-sm p-2.5 ${errors.confirm_password && touched.confirm_password ? "border-2 border-red-600 rounded-l-md" : ""} `}
                                        placeholder="confirm password"
                                        type="confirm_password"
                                        id="confirm_password"
                                        name='confirm_password'
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                { errors.confirm_password && touched.confirm_password ? <p className='text-red-600 text-xs '>{errors.confirm_password}</p> : null}
                            </div>
                            <button type="submit" className="mx-auto text-white bg-purple-700 hover:bg-purple-600 focus:ring-2 focus:outline-none focus:ring-purple-900 font-bold rounded-lg text-sm w-1/4 px-3 py-2 text-center">Signup</button>
                            <div className="flex justify-center my-2">
                                <hr className="w-20 h-px my-4 mr-3 bg-purple-500" />
                                <span className="font-bold text-purple-950">or signup with</span>
                                <hr className="w-20 h-px my-4 ml-3 bg-purple-500" />
                            </div>
                            <div className="flex justify-around space-x-8">
                                <button className='text-3xl'><FcGoogle /></button>
                                <button className='text-3xl bg-white rounded-full '><FaFacebook /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup