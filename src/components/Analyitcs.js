"use client";
import React from 'react'
import "./analytics.css"
import AnalyticsSidebar from './AnalyticsSidebar';
const Analyitcs = () => {
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