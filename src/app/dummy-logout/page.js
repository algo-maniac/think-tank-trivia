"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession,signOut } from 'next-auth/react'

export default function page() {
    const {status,data}=useSession();
    const router=useRouter();
    if(status==='unauthenticated'){
        router.replace("/")
    }
    console.log("User Details",data);
  return (
    <div>
      <button onClick={()=>{signOut()}}>Logout</button>
    </div>
  )
}
