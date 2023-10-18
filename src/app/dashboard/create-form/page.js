"use client"
import { use, useDebugValue, useEffect, useState } from 'react';
import style from './style.module.css'
import CreateQuestion from '@/components/CreateQuestion';
import CreateMcq from '@/components/CreateMcq';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import Modal from '@/components/Modal';
export default function Page(){
    const [data,setData]=useState([]);
    const [flag,setFlag]=useState(false);
    const [question,setQuestion]=useState("");
    const [modal,setModal]=useState(false);
    const [error,setError]=useState(false);
    const [a,seta]=useState("");
    const [b,setb]=useState("");
    const [c,setc]=useState("");
    const [d,setd]=useState("");
    const {user}=useContext(UserContext);
    const mcqHandler=()=>{
        setFlag(true);
    }
    const questionHandler=()=>{
        setFlag(false);
    }
    const questionHandler1=(env)=>{
        setQuestion(env.target.value)
    }
    const optionHandler1=(env)=>{
        seta(env.target.value);
    }
    const optionHandler2=(env)=>{
        setb(env.target.value);
    }
    const optionHandler3=(env)=>{
        setc(env.target.value);
    }
    const optionHandler4=(env)=>{
        setd(env.target.value);
    } 
    const addMCQ=()=>{
        if(question==='' || a==='' || b==='' || c==='' || d===''){
            setError(true);
        }
        else{
            setData([...data,{
                id:data.length,
                value:{type:"MCQ",question:question,a:a,b:b,c:c,d:d}
            }])
        }
    }
    const addQuestion=()=>{
        if(question===''){
            setError(true);
        }
        else{
            setData([...data,{
                id:data.length,
                value:{type:"TEXT",question:question}
            }])
        }
    }
    const submitHandler=()=>{
        // console.log(question,a,b,c,d);
        if(flag){
            addMCQ();
        }
        else{
            addQuestion();
        }
    }
    const formsubmitHandler=()=>{
        // console.log("data form client : ",data);
        fetch("/api/create-form",{//automatically make a call on current domain
            method:'POST',
            body:JSON.stringify({
                data:data,
                user_id:user._id,
                form_name:"form-name",//tuhin add the form name here
            }),
            header:{
                'Content-Type':'application/json'
            }
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            setModal(true);
        }).catch((er)=>{
            console.log(er)
            setError(true);
        })
    }
    return <>
        {modal && <Modal val={{type:"success",msg:"Forms created successfully"}}></Modal>}
        {error && <Modal val={{type:"error",msg:"Validation Error, Do need leave any input as blank"}}></Modal>}
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.mode}>
                <button className={style.button4} onClick={formsubmitHandler}>Publish</button>
            </div>
        </div>
        <div className={style.main}>
        <div className={style.header1}>
            <div>
                <h1>Control Panel</h1>
            </div>
        </div>
        <div className={style.controlpanel}>
            <div className={style.selector}>
                <div className={flag && style.mcqSelector} onClick={mcqHandler}>
                    <span>MCQ-Type</span>
                </div>
                <br></br>
                <div className={!flag && style.questionSelector} onClick={questionHandler}>
                    <span>Text-Type</span>
                </div>
            </div>
            {flag && <div className={style.mcq}>
                <p>Write the question?</p>
                <textarea placeholder='Write your question here' className={style.question} onChange={questionHandler1}></textarea>
                <p>Select Options</p>
                <div className={style.options}>
                    <div className={style.first}>
                        A: <input onChange={optionHandler1}></input><br></br>
                        B: <input onChange={optionHandler2}></input>
                    </div>
                    <div className={style.second}>
                        C: <input onChange={optionHandler3}></input><br></br>
                        D: <input onChange={optionHandler4}></input>
                    </div>
                </div>
            </div>}
            {!flag && <div className={style.mcq}>
                <p>Write the question?</p>
                <textarea placeholder='Write your question here' className={style.question} onChange={questionHandler1}></textarea>
            </div>}
            <div className={style.submit}>
                <button className={style.button9} onClick={submitHandler}>Submit</button>
            </div>
        </div>
        {
            data.map(function(val){
                if(val.value.type==="MCQ"){
                    return <CreateMcq key={val.id} content={val.value}/>
                }
                else{
                    return <CreateQuestion key={val.id} content={val.value.question}/>
                }
            })
        }
        </div>
    </>
}