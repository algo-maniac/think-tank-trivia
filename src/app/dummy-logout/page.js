"use client"
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import "./logout.css"
import UserContext from '@/context/userContext/userContext'

export default function page() {
  const router = useRouter();

  const { auth_status, auth_session } = useContext(UserContext);

  if (auth_status === 'loading') {
    return <p className='text-center p-4 bg-slate-400'>Loading...</p>
  }

  if (auth_status === 'unauthenticated') {
    return router.push("/")
  }
  // console.log("User Details", auth_session);
  return (
    <div>
      <button onClick={() => { signOut() }}>Logout</button>
    </div>
  )
}
