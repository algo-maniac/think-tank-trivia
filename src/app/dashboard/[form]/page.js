"use client"
import style from './style.module.css'
import FormHeader from '../../../components/FormHeader'
import MCQ from '../../../components/MCQ'
import Question from '@/components/Question';
import { useDebugValue, useEffect, useState } from 'react';
export default function Page({params}){
    const formId=params.form;
    const [question,setQuestion]=useState([]);
    useEffect(()=>{
        async function fetchForm(){
            let data=await fetch("http://localhost:3000/api/dashboard/236528e88fef5d4b45b38259644");
            data=await data.json();
            setQuestion(data)
        }
        fetchForm();
    },[])
    return <>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.nav}>
                <div><a href>Preview</a></div>
                <div><a href={formId+"/share-portal"}>Share</a></div>
                <div><a href={formId+"/response"}>Response</a></div>
                <div><a href="/setting">Setting</a></div>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>Light</button>
                <button className={style.button31}>Dark</button>
            </div>
        </div>
        <div className={style.contentheader}>
            <img src="/form-header1.png" height={"100%"} width={"100%"}></img>
        </div>
        {/* Pass the data by props */}
        <FormHeader></FormHeader>
        <MCQ></MCQ>
        <Question></Question>
        <Question></Question>
        <MCQ></MCQ>
    </>
}