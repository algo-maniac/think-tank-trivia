"use client";
import React, { useContext } from 'react'
import "./analytics.css"
import AnalyticsSidebar from './AnalyticsSidebar';
import UserContext from '@/context/userContext/userContext';
import { useRouter } from 'next/navigation';
import BarChart from './BarChart';

const Analyitcs = () => {
  const router = useRouter();
  const { user, auth_session, auth_status } = useContext(UserContext);
  if (auth_status == 'unauthenticated') {
    return router.push('/login');
  }
  return (
    <>
      <div className='flex flex-row justify-start h-screen'>
        <AnalyticsSidebar />
        <div className='right-side flex-1 px-5 text-black py-5 border border-red-900'>
          <div className='flex space-x-4'>
            <div className='bar-chart border border-green-800 w-2/4 p-5'>
              <BarChart />
            </div>
            <div className='badge'>
              {/* badge */}
            </div>
          </div>
          <div className='donut-chart'>
            {/* donut chart */}
          </div>
        </div>
      </div>
    </>
  )
}


export default Analyitcs