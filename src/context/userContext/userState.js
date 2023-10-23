"use client"
import React, { Fragment, useEffect, useState } from 'react'
import UserContext from './userContext'
import { useSession } from 'next-auth/react'
import Loader from '@/components/Loader'

export default function UserState(props) {

    const { data: auth_session, status: auth_status } = useSession();

    const [loaderFlag, setLoaderFlag] = useState(false);

    // console.log("auth_status",auth_status);
    // console.log("session",auth_session);

    if (auth_status === 'loading') {
        return <h1>Loading...</h1>
    }

    const [user, setUser] = useState(() => {
        if (auth_status == 'authenticated') {
            // console.log("props.user",props.user);
            return props.user;
        }
        return "unauthenticated";
    });

    //fetch the logged in user details and set the user state 
    const fetchUserDetails = async function () {
        if (auth_status == 'unauthenticated') {
            return setUser('unauthenticated');
        }
        fetch(`/api/user/get-user-data/${auth_session.user.email}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data);
                setUser(data.user);
            })
            .catch((er) => {
                console.log('Error from server side')
                console.log(er);
            })
    }

    // console.log("LocalStorage",localStorage.getItem('expTime'),localStorage);
    

    if (localStorage.getItem('expTime')) {
        let exp = new Date(localStorage.getItem('expTime'));
        exp.setMinutes(exp.getMinutes+5);
        let cur = new Date(Date.now());
        let diff = exp - cur;//ms
        let time = diff / 1000;
        if(time<=0){
            let data = JSON.parse(localStorage.getItem('data'));
            let responses = data.responses;
            let formId = localStorage.getItem('formId');
            let userId = localStorage.getItem('userId');
            fetch(`/api/attempt/response-submit/${formId}`, {
                method: 'POST',
                body: JSON.stringify({
                    answer: responses,
                    user_id: userId
                }),
                header: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.removeItem('data');
            localStorage.removeItem('expTime');
            localStorage.removeItem('formId');
            localStorage.removeItem('userId');
            localStorage.removeItem('TIME');
            localStorage.removeItem('timerId1');
            localStorage.removeItem('timerId2');
        }
    }


    // useEffect(()=>{
    //     fetchUserDetails();
    // },[]);

    // console.log("user state",user);

    const value = {
        auth_session,
        auth_status,
        user,
        fetchUserDetails,
        loaderFlag,
        setLoaderFlag
    };

    return (
        <Fragment>
            <UserContext.Provider value={value}>
                {props.children}
            </UserContext.Provider>
            {loaderFlag && <Loader />}
        </Fragment>
    )
}

