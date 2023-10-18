"use client"
import { useParams } from 'next/navigation'
import style from './style.module.css'
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
export default function Page({ params }) {
    const formId = params.id;
    // dummy data need to connect backend
    const [questions, setQuestion] = useState([]);
    const [response, setResponse] = useState([]);
    const [modal, setModal] = useState(false)
    const [loader, setLoader] = useState(true);
    const [answer, setAnswer] = useState(new Map);
    const [error, setError] = useState(false);
    const { user } = useContext(UserContext)
    // console.log(user);
    useEffect(() => {
        fetch(`/api/attempt/fetch-form/${formId}`, {
            method: 'POST',
            body: JSON.stringify({
                // answer:answer,
                user_id: user._id
            }),
            header: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log(data.form.questions)
            setQuestion(data.form.questions)
            setLoader(false);
        }).catch((er) => {
            console.log("Error");
        })
    }, [])
    const answerHandler = (env) => {
        const val = env.target.value;
        const id = env.target.id;
        answer.set(id, val);
        if (val === '') {
            answer.delete(id, val);
        }
    }
    const mcqHandler = (env) => {
        const val = env.target.value;
        const id = env.target.id
        answer.set(id, val)
        if (val === '') {
            answer.delete(id, val);
        }
    }
    const submitHandler = () => {
        console.log(answer)
        // validation
        // console.log(answer.size)
        // for(let it of answer){
        //     console.log("it",it);
        // }
        if (answer.size !== questions.length) {
            setError(true);
        }
        else {
            //anwser is map with id as question id and value as value written in input
            let responses = [];
            for (let it of answer) {
                responses.push({ ques_id: it[0], ans_given: it[1] });
            }
            fetch(`/api/attempt/response-submit/${formId}`, {
                method: 'POST',
                body: JSON.stringify({
                    answer: responses,
                    user_id: user._id
                }),
                header: {
                    'Content-Type': 'application/json'
                }
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setModal(true);
            }).catch((er) => {
                console.log('Error');
            })
        }
    }
    return <>
        {loader && <Loader></Loader>}
        {modal && <Modal val={{ type: "success", msg: "Response Submitted successfully" }}></Modal>}
        {error && <Modal val={{ type: "Error", msg: "Validation error, Do not leave any input blank" }}></Modal>}
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.mode}>
                <button className={style.button31} onClick={submitHandler}>Submit</button>
            </div>
        </div>
        <div className={style.header1}>
            <div>
                <h1>Fill out the Form </h1>
            </div>
        </div>
        {
            questions.map(function (data, id) {
                if (data.ques_type === "TEXT") {
                    return <>
                        <div className={style.questionHeader} key={data._id}>
                            <div className={style.question}>
                                <p>{data.question}</p>
                            </div>
                            <hr></hr>
                            <div className={style.answer}>
                                <textarea className={style.textfield} cols={100} rows={3} placeholder='Write your answer' id={data._id} onChange={answerHandler}></textarea>
                            </div>
                        </div>
                    </>
                }
                else {
                    return <>
                        <div className={style.mcqHeader} key={data._id}>
                            <div className={style.question}>
                                <p>{data.question}</p>
                            </div>
                            <hr></hr>
                            <div className={style.answer}>
                                <input type='radio' value='a' name='option' id="652c0994c7874276a00aa9f" className='a' onChange={mcqHandler}></input><p>{data.a}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value='b' name='option' id="652c0994c7874276a00aa9f6" className='a' onChange={mcqHandler}></input><p>{data.b}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value='c' name='option' id="652c0994c7874276a00aa9f6" className='a' onChange={mcqHandler}></input><p>{data.c}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value='d' name='option' id="652c0994c7874276a00aa9f6" className='a' onChange={mcqHandler}></input><p>{data.d}</p>
                            </div>
                        </div>
                    </>
                }
            })

        }
    </>
}