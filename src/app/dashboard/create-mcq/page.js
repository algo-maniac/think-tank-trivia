"use client"
import { use, useState } from 'react';
import style from './../create-form/style.module.css'
import CreateQuestion from '@/components/CreateQuestion';
import CreateMcq from '@/components/CreateMcq';
export default function Page(){
    const [data,setData]=useState([]);
    const [flag,setFlag]=useState(false);
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
    const [option1,setOption1]=useState("");
    const [option2,setOption2]=useState("");
    const [option3,setOption3]=useState("");
    const [option4,setOption4]=useState("");
    const [correctOption,setcorrectOption]=useState("");
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
        setOption1(env.target.value);
    }
    const optionHandler2=(env)=>{
        setOption2(env.target.value);
    }
    const optionHandler3=(env)=>{
        setOption3(env.target.value);
    }
    const optionHandler4=(env)=>{
        setOption4(env.target.value);
    } 
    const addMCQ=()=>{
        setData([...data,{
            id:data.length,
            value:{type:true,question:question,option1:option1,option2:option2,option3:option3,option4:option4}
        }])

    }
    const addQuestion=()=>{
        setData([...data,{
            id:data.length,
            value:{type:false,question:question}
        }])
    }
    const answerHandler1=(env)=>{
        setAnswer(env.target.value);
    }
    const optionanswerHandler=(env)=>{
        setcorrectOption(env.target.value);
    }
    const submitHandler=()=>{
        // console.log(question,option1,option2,option3,option4);
        if(flag){
            addMCQ();
        }
        else{
            addQuestion();
        }
    }
    return <>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>On-Air</button>
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
                <p>Write the answer.</p>
                <textarea placeholder='Write your answer here' className={style.question} onChange={answerHandler1}></textarea>
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
                <p>Choose the correct option</p>
                <div className={style.options}>
                    <div className={style.first}>
                        <input onChange={optionHandler1} onClick={optionanswerHandler}></input><br></br>
                    </div>
                </div>
            </div>}
            {!flag && <div className={style.mcq}>
                <p>Write the question?</p>
                <textarea placeholder='Write your question here' className={style.question} onChange={questionHandler1}></textarea>
                <p>Write the answer.</p>
                <textarea placeholder='Write your answer here' className={style.question} onChange={answerHandler1}></textarea>
            </div>}
            <div className={style.submit}>
                <button className={style.button9} onClick={submitHandler}>Submit</button>
            </div>
        </div>
        {
            data.map(function(val){
                if(val.value.type===true){
                    return <CreateMcq content={val.value}/>
                }
                else{
                    return <CreateQuestion content={val.value.question}/>
                }
            })
        }
        </div>
    </>
}