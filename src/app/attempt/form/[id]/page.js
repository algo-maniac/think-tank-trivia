"use client"
import { useParams } from 'next/navigation'
import style from './style.module.css'
import { useState } from 'react';

export default function Page({params}){
    const formId=params.id;
    console.log(formId);
    // dummy data need to connect backend
    const [response,setResponse]=useState([]);
    const questions=[{type:false,question:"Who is Honey Singh"},{type:true,question:"Capital of India",option1:"New Delhi",option2:"Mumbai",option3:"Bengalore",option4:"Kolkata"}]
    const answerHandler=(env)=>{
        const val=env.target.value;
        const id=parseInt(env.target.id);
        console.log(typeof(id));
        setResponse(
            response[id]=val
        )
        console.log(response);
    }
    return<>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>Light</button>
                <button className={style.button31}>Dark</button>
            </div>
        </div>
        <div className={style.header1}>
            <div>
                <h1>Fill out the Form </h1>
            </div>
        </div>
        {
            questions.map(function(data,id){
                console.log(data,id);
                if(data.type==false){
                    return <>
                        <div className={style.questionHeader} key={2}>
                            <div className={style.question}>
                                <p>{data.question}</p>
                            </div>
                            <hr></hr>
                            <div className={style.answer}>
                                <textarea className={style.textfield} cols={100} rows={3} id={id} placeholder='Write your answer' onChange={answerHandler}></textarea>
                            </div>
                        </div>
                    </>
                }
                else{
                    return<>
                        <div className={style.mcqHeader} key={1}>
                            <div className={style.question}>
                                <p>{data.question}</p>
                            </div>
                            <hr></hr>
                            <div className={style.answer}>
                                <input type='radio' value={true} name='option'></input><p>{data.option1}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value={true} name='option'></input><p>{data.option2}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value={true} name='option'></input><p>{data.option3}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value={true} name='option'></input><p>{data.option4}</p>
                            </div>
                        </div>
                    </>
                }
            })
        }
    </>
}