"use client"
import React,{Fragment, useEffect, useState} from 'react'
import UserContext from './userContext'
import { useSession } from 'next-auth/react'

export default function UserState(props) {

    const {data:auth_session,status:auth_status}=useSession();

    // console.log("auth_status",auth_status);
    // console.log("session",auth_session);

    if(auth_status==='loading'){
        return <h1>Loading...</h1>
    }

    const [user,setUser]=useState(()=>{
        if(auth_status=='authenticated'){
            return null;
        }
        return "unauthenticated";
    });

    //fetch the logged in user details and set the user state 
    const fetchUserDetails=async function(){
        if(auth_status=='unauthenticated'){
            return setUser('unauthenticated');
        }
        fetch(`/api/user/get-user-data/${auth_session.user.email}`)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            // console.log(data);
            setUser(data.user);
        })
        .catch((er)=>{
            console.log('Error from server side')
            console.log(er);
        })
    }


    useEffect(()=>{
        fetchUserDetails();
    },[]);

    // console.log("user state",user);

    const value={
        auth_session,
        auth_status,
        user,
        fetchUserDetails
    };

    return (
        <Fragment>
            <UserContext.Provider value={value}>
                {props.children}
            </UserContext.Provider>
        </Fragment>
    )
}

