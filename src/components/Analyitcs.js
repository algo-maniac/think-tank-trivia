"use client";
import React, { useContext } from 'react'
import "./analytics.css"
import AnalyticsSidebar from './AnalyticsSidebar';
import UserContext from '@/context/userContext/userContext';
import { useRouter } from 'next/navigation';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import PieChart from './PieChart';

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
        <div className='right-side flex-1 px-5 text-black py-1 border border-red-900 '>
          <div className='analytics-container flex flex-col '>
            <div className='flex space-x-10 p-5'>
              <div className='bar-chart w-[45%] p-5 shadow-md shadow-gray-600'>
                <BarChart />
              </div>
              <div className='badge w-[45%]'>
                {/* <BarChart /> */}
              </div>
            </div>
            <div className='user-chart border border-red-600 my-3 flex p-5 gap-4'>
              <div className='w-2/4 shadow-md shadow-gray-600'>
                <div className='border border-green-600 w-56 m-auto'>
                  <DoughnutChart />
                </div>
              </div>
              <div className='w-2/4 shadow-md shadow-gray-600'>
                <div className='border border-green-600 w-56 m-auto'>
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Analyitcs