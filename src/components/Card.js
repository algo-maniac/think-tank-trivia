import Link from 'next/link';
import './Card.css'
import Avatar from '@mui/material/Avatar';
import style from '../app/dashboard/[form]/response/style.module.css'
import { useState } from 'react';
import Loader from './Loader';
const Card=(props)=>{
    const date=new Date(props.val.date);
    const [responseModal,setResponse]=useState(false);
    const [loader,setLoader]=useState(true);
    const [question,setQuestion]=useState([]);
    var day=date.getDate();
    var month=date.toLocaleString('default', { month: 'long' });
    var year=date.getFullYear();
    var str=`${day} ${month},${year}`
    const name=props.val.user.name;
    const res_id=props.val._id;
    // console.log(res_id)
    const closeHandler=()=>{
        setResponse(false);
    }
    const openHandler=()=>{
        setResponse(true);
        fetch(`/api/fetch-response-details/${res_id}`,{
            method:'GET'
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            // console.log(data.response_details.responses);
            setQuestion(data.response_details.responses);
            setLoader(false)
        })
    }
    return <>
        {responseModal &&<>
            <div className={style.responsemodal}>
            </div>
            <div className={style.infocard}>
                <div className={style.header}>
                    <h1>Filled-Form</h1>
                </div>
                <label>Responded answer</label>
                <div className={style.questionContainer}>
                    {
                        question && question.map(function(data){
                            return <>
                                <div className={style.questionBox}>
                                    <div className={style.question}>{data.ques_id.question}</div>
                                    <div className={style.answer}>{data.ans_given}</div>
                                </div>
                            </>
                        })
                    }
                </div>
                    {loader && <div>Loading...</div>}
                <div className={style.closeBtn}>   
                    <button class={style.button1} role="button" onClick={closeHandler}>Close</button>
                </div>
            </div>
            </>
        }
        <div className="card" onClick={openHandler}>
            <div className="header">
                <Avatar className="avatar">{name[0]}</Avatar>
                <span>{props.val.user.name}</span>
            </div>
            <div className="msg">
                <span>Responded on<br></br><b>{str}</b></span>
            </div>
        </div>
    </>
}
export default Card;