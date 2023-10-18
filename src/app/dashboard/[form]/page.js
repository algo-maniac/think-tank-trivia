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
            let data=await fetch(`/api/dashboard/${formId}`);
            data=await data.json();
            console.log(data)
            // console.log("data received at client",data);
            setQuestion(data.form.questions)
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
        {
            question.map(function(data){
                if(data.ques_type=="TEXT"){
                    return <Question data={data}></Question>
                }
                else{
                    return <MCQ data={data}></MCQ>
                }
            })
        }
    </>
}