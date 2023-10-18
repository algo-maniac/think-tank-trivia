"use client"
import { useParams } from "next/navigation"
import style from "./style.module.css"
import Card from "@/components/Card"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
export default function Page({params}){
    const [flag,setFlag]=useState(true);
    const [response,setResponse]=useState([]);
    const url=window.location.href.split('/');
    const formId=url[4];
    const flagHandler=()=>{
        setFlag(!flag);
    }
    useEffect(()=>{
        fetch(`/api/dashboard/${formId}`,{
            method:'GET'
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
        }).catch((er)=>{
            console.log('Error');
        })
    })
    return <>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.nav}>
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
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>

            <Card></Card>
        </div>}
    </>
}