"use client";
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { IoLogoDropbox } from "react-icons/io"
import { AiOutlineDoubleLeft } from "react-icons/ai"
import { AiTwotoneHome } from "react-icons/ai"
import { MdDashboardCustomize } from "react-icons/md"
import { IoMdSettings } from "react-icons/io"
import UserContext from '@/context/userContext/userContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const AnalyticsSidebar = () => {
    const [toggleExpand, setToggleExpand] = useState(true);
    const sidebarClass = classNames(
        "flex flex-col px-2 pt-5 pb-3 bg-sky-950 text-white h-screen border border-gray-900 justify-between",
        {

            ['w-65']: toggleExpand,
            ['w-25']: !toggleExpand,
        }
    )
    
    const { auth_session, user, auth_status } = useContext(UserContext);
    return (
        <>
            <div className={sidebarClass}>
                <div className='flex'>
                    <div className={classNames('flex relative justify-around space-x-7 shadow shadow-sky-900 p-2', { "shadow-none": !toggleExpand })}>
                        <IoLogoDropbox className='text-green-600 text-5xl' />
                        <div className={classNames('mt-2 font-bold text-lg', { 'hidden': !toggleExpand })}>
                            Think-Tank-Trivia
                        </div>
                        <button className={classNames('border bg-gray-600 rounded-lg h-8 mt-2 hover:bg-gray-500 hover:border hover:border-gray-400 right-0', {
                            "rotate-180": !toggleExpand,
                        })} onClick={() => {
                            setToggleExpand(!toggleExpand);
                        }}>
                            <AiOutlineDoubleLeft className='w-fit' />
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-8 ml-4'>
                    <div className={classNames('flex  shadow shadow-sky-900 p-2', { "shadow-none": !toggleExpand })}>
                        <Link href={"/dashboard"}><AiTwotoneHome className='text-3xl hover:text-gray-400 hover:cursor-pointer' /></Link>
                        <div className={classNames('ml-10 hover:text-gray-400 hover:cursor-pointer my-auto', {
                            "hidden": !toggleExpand,
                        })}>
                            <Link href={"/"}>Home</Link>
                        </div>
                    </div>
                    <div className={classNames('flex  shadow shadow-sky-900 p-2', { "shadow-none": !toggleExpand })}>
                        <Link href={"/dashboard"}><MdDashboardCustomize className='text-3xl hover:text-gray-400 hover:cursor-pointer' /></Link>
                        <div className={classNames('ml-10 hover:text-gray-400 hover:cursor-pointer my-auto', {
                            "hidden": !toggleExpand,
                        })}>
                            <Link href={"/dashboard"}>Form-Portal</Link>
                        </div>
                    </div>
                    <div className={classNames('flex  shadow shadow-sky-900 p-2', { "shadow-none": !toggleExpand })}>
                        <Link href={"/#"}><IoMdSettings className='text-3xl hover:text-gray-400 hover:cursor-pointer' /></Link>
                        <div className={classNames('ml-10 hover:text-gray-400 hover:cursor-pointer my-auto', {
                            "hidden": !toggleExpand,
                        })}>
                            <Link href={"/#"}>Settings</Link>
                        </div>
                    </div>
                </div>
                <div className={classNames('flex space-x-10 ml-4  shadow shadow-sky-900 p-2', { "shadow-none": !toggleExpand })}>
                    <div className='w-10 rounded-full mt-3 '>
                        <img src={auth_session.user.image} alt={user.image} className='rounded-full' />
                    </div>
                    <div className={classNames('flex flex-col gap-3 ', { "hidden": !toggleExpand })}>
                        <div className=''>{user.username}</div>
                        <div className='font-bold hover:text-gray-400 hover:cursor-pointer' onClick={() => { signOut() }}>Logout</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalyticsSidebar