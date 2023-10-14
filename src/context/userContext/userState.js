"use client"
import React,{Fragment} from 'react'
import UserContext from './userContext'
import { useSession } from 'next-auth/react'

export default function UserState(props) {

    const {data:auth_session,status:auth_status}=useSession();

    // console.log("auth_status",auth_status);
    // console.log("session",auth_session);

    if(auth_status==='loading'){
        return <h1>Loading...</h1>
    }

    return (
        <Fragment>
            <UserContext.Provider value={{auth_session,auth_status}}>
                {props.children}
            </UserContext.Provider>
        </Fragment>
    )
}

