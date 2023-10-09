"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import "./logout.css"

export default function page() {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p className='text-center p-4 bg-slate-400'>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return router.push("/")
  }
  console.log("User Details", data);
  return (
    <div>
      <button onClick={() => { signOut() }}>Logout</button>
    </div>
  )
}
