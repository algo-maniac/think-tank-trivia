"use client";
import React, { useContext } from 'react'
import { GiPoliceBadge } from "react-icons/gi"
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

  // const user_score = 90;
  const user_score = Math.floor(user.avg_score);
  console.log(user_score);
  // const badgeUrl = "./BlackMamba.jpg";
  var badgeUrl = "";
  if (user_score >= 0 && user_score <= 4) { 
    badgeUrl = "./Unrated.jpg";
  } else if (user_score >= 5 && user_score <= 49) {
    badgeUrl = "./BlackMamba.jpg";
  } else if (user_score >= 50 && user_score <= 79) {
    badgeUrl = "./Wolves.jpg";
  } else {
    badgeUrl = "./TheLion.jpg";
  }
  return (
    <>
      <div className='flex flex-row justify-start h-screen'>
        <AnalyticsSidebar />
        <div className='right-side flex-1 px-5 text-black p-3'>
          <div className='analytics-container flex flex-col '>
            <div className='flex space-x-4 '>
              <div className='bar-chart w-[56%] p-5 shadow-md shadow-gray-600'>
                <BarChart />
              </div>
              <div className='badge w-[59%] shadow-md shadow-gray-600 flex p-1 gap-1'>
                <div className='left w-[50%] flex flex-col'>
                  <div className='flex'>
                    <div className='mt-[0.4rem]'>
                      <GiPoliceBadge className='text-yellow-500' />
                    </div>
                    <div className='text-center'>
                      <h1 className='font-bold text-xl ml-2 bg-gradient-to-r from-amber-700 via-yellow-900 to-red-500 inline-block text-transparent bg-clip-text'>Badge</h1>
                    </div>
                  </div>
                  <div className=' text-center mt-8'>
                    <h1 className='font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{user.username}</h1>

                    <p className='text-sm'>avgerage_score : {Math.floor(user_score)} %</p>

                  </div>
                  <div className='flex flex-col mt-8'>
                    <div className='text-center text-sm'>unrated : 0-4</div>
                    <div className='text-center text-sm'>black mamba : 5-49 </div>
                    <div className='text-center text-sm'>wolve : 50-79</div>
                    <div className='text-center text-sm'>lion : 80-100</div>
                  </div>
                </div>
                <div className='right w-[50%]'>
                  <div className='badge-photo shadow-lg shadow-gray-400 rounded-full p-2 my-16 mx-auto w-[60%]'>
                    <img className='rounded-full' src={badgeUrl} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className='user-chart mt-6 flex gap-4'>
              <div className='w-2/4 shadow-md shadow-gray-600'>
                <div className=' w-56 m-auto'>
                  <DoughnutChart />
                </div>
              </div>
              <div className='w-2/4 shadow-md shadow-gray-600'>
                <div className=' w-56 m-auto'>
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