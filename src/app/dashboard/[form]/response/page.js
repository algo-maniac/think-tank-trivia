"use client"
import { useParams } from "next/navigation"
import style from "./style.module.css"
import Card from "@/components/Card"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
export default function Page({ params }) {
    const { auth_status } = useContext(UserContext);
    const router = useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const [flag, setFlag] = useState(true);
    const [responseModal, setResponse] = useState(false);
    const [response, setRes] = useState([]);
    const [loader, setLoader] = useState(true);
    const url = window.location.href.split('/');
    const formId = url[4];
    const flagHandler = () => {
        setFlag(!flag);
    }
    const closeHandler = () => {
        setResponse(false);
    }
    // api call for response cards
    useEffect(() => {
        fetch(`/api/fetch-responses-list/${formId}`, {
            method: 'GET'
        }).then((data) => {
            return data.json();
        }).then((data) => {
            if (data.ok == true) {
                setFlag(true);
                setRes(data.responses_list);
            }
            setLoader(false);
        }).catch((er) => {
            console.log("error");
        })
    }, [])
    return <>
        {loader && <Loader></Loader>}
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
            </div>
            <div className={style.nav}>
                <div><a href={"/dashboard"}>DashBoard</a></div>
                <div><a href={`/dashboard/${formId}`}>Preview</a></div>
                <div><a href={`/dashboard/${formId}/share-portal`}>Share</a></div>
                <div><a href={`/dashboard/${formId}/response`}>Response</a></div>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>Light</button>
                <button className={style.button31}>Dark</button>
            </div>
        </div>
        <div className={`${style.examContainer}`}>
            <div className={style.header1}>
                <div className={`${flag && style.green}`} onClick={flagHandler}>
                    <span className={`${flag && style.blue}`}>Individual</span>
                </div>
                <div className={`${!flag && style.green}`} onClick={flagHandler}>
                    <span>Questions</span>
                </div>
            </div>
        </div>
        {flag && <div className={style.individual}>
            {
                response.map(function (data) {
                    return <Card key={data._id} val={data}></Card>
                })
            }
        </div>}
    </>
}