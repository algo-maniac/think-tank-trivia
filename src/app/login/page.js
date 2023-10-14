import React from 'react'
import Login from './Login';
import './loginStyle.css';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
export const metadata = {
  title: "Login : THINK-TANK-TRIVIA"
};
const page = () => {
  const router=useRouter();
  const {auth_status}=useContext(UserContext);
  if(auth_status==='unauthenticated'){
    return router.push("/");
  }
  return (
    <Login />
  )
}

export default page