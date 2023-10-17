"use client";
import React, { useContext } from 'react'
import "./analytics.css"
import AnalyticsSidebar from './AnalyticsSidebar';
import UserContext from '@/context/userContext/userContext';
import { useRouter } from 'next/navigation';
const Analyitcs = () => {
  const router = useRouter();
  const { user, auth_session, auth_status } = useContext(UserContext);
  if(auth_status=='unauthenticated'){
    return router.push('/login');
  }
  return (
    <>
      <div className='flex flex-row justify-start h-screen'>
        <AnalyticsSidebar />
        <div className='flex-1 px-5 text-white py-5 border border-red-900'>......THIS PAGE WILL BE OUR ANALYTICS PAGE.......</div>
      </div>
    </>
  )
}


export default Analyitcs