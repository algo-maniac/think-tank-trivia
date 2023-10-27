"use client"
import { useParams } from 'next/navigation'
import style from './style.module.css'
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';


function mapToArrayResponse(answer) {
    let responses = [];
    for (let it of answer) {
        responses.push({ ques_id: it[0], ans_given: it[1] });
    }
    return responses;
}

function mapToLocalStorage(answer) {
    let responses = mapToArrayResponse(answer);
    localStorage.setItem('data', JSON.stringify({ responses }));


    // let formId = localStorage.getItem('formId');
    // let userId = localStorage.getItem('userId');
    // fetch("/api/attempt/temp-response", {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         // answer:answer,
    //         userId: userId,
    //         formId:formId,
    //         responses:responses
    //     }),
    //     header: {
    //         'Content-Type': 'application/json'
    //     }
    // });
}

function localStorageToServer(){
    let formId = localStorage.getItem('formId');
    let userId = localStorage.getItem('userId');

    let data = JSON.parse(localStorage.getItem('data'));
    let responses = data==null?[]:data.responses;

    fetch("/api/attempt/temp-response", {
        method: 'POST',
        body: JSON.stringify({
            // answer:answer,
            userId: userId,
            formId:formId,
            responses:responses
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });
}

function localStorageToMap(answer) {
    let data = JSON.parse(localStorage.getItem('data'));
    let responses = data.responses;
    for (let it of responses) {
        answer.set(it.ques_id, it.ans_given);
    }
}

// let time;

export default function Page({ params }) {
    const formId = params.id;
    // dummy data need to connect backend
    const router = useRouter();
    const [questions, setQuestion] = useState([]);
    const [response, setResponse] = useState([]);
    const [modal, setModal] = useState(false)
    const [loader, setLoader] = useState(true);
    const [answer, setAnswer] = useState(new Map);
    const [error, setError] = useState(false);
    const { user, auth_status } = useContext(UserContext);
    const [responded, setResponded] = useState(false);
    const [owner, setOwner] = useState(false);
    const [notInit,setNotInit]=useState(false);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [firstTimeLoad,setFirstTimeLoad]=useState(()=>{return true});
    // const [timerId1,setTimerId1]=useState();
    // const [timerId2,setTimerId2]=useState();
    // const [time,setTime]=useState(60);
    // const [time,setTime]=useState(60)
    // //console.log(user);
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }

    if (localStorage.getItem('expTime')) {
        let fomrId_local = localStorage.getItem('formId');
        if (fomrId_local != formId) {
            router.push(`/attempt/form/${fomrId_local}`);
            return (<h1>Redirection to the currently attempting quiz</h1>)
        }
        if(firstTimeLoad){
            let data_from_localStorage = JSON.parse(localStorage.getItem('data'));
            let responses_from_localStorage = data_from_localStorage.responses;
            for (let it of responses_from_localStorage) {
                answer.set(it.ques_id, it.ans_given);
            }
            setFirstTimeLoad(false);
        }
    }

    // let time_counter_id;
    // let localStorage_set_id;
    // let time;

    useEffect(() => {
        if (localStorage.getItem('expTime')) {
            let fomrId_local = localStorage.getItem('formId');
            if (fomrId_local != formId) {
                return;
            }
        }

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
            const msg = data.message;
            if (msg === "The reponse was submitted") {
                setResponded(true);
            }
            else if (msg === "Owner") {
                setOwner(true);
            }
            else if(notInit== "not-initiated"){
                setNotInit(true);
            }
            else {
                setQuestion(data.form.questions);
                //set the time out time in local storage
                localStorage.setItem('expTime', data.expTime);
                localStorage.setItem('formId', formId);
                localStorage.setItem('userId', user._id);
                if (!localStorage.getItem('data')) {
                    localStorage.setItem('data', JSON.stringify({ responses: [] }));
                }
                let exp = new Date(data.expTime);
                let cur = new Date(Date.now());
                let diff = exp - cur;//ms
                // let time=diff/1000;
                // setTime(diff/1000);
                let TIME = diff / 1000;
                localStorage.setItem('TIME', TIME.toString());
                // time = TIME;
                if (localStorage.getItem('timerId1')) {
                    clearInterval(parseInt(localStorage.getItem('timerId1')));
                }
                let time_counter_id = setInterval(() => {
                    let TIME = parseInt(localStorage.getItem('TIME')) - 1;
                    // let TIME = time - 1;
                    if (TIME <= 0) {
                        let timerId1 = parseInt(localStorage.getItem('timerId1'));
                        let timerId2 = parseInt(localStorage.getItem('timerId2'));
                        clearInterval(timerId1);
                        clearInterval(timerId2);
                        setSecond(0);
                        setMinute(0);
                        //console.log("TIme < 0");
                        //console.log(timerId1);
                        //console.log(timerId2);
                        setTimeout(() => { submitHandler(); }, 1000);
                        return;
                    }
                    //console.log("TIME", TIME);
                    // //console.log("state timer 1",timerId1);
                    // //console.log("state timer 2",timerId2);
                    let min = Math.floor(TIME / 60);
                    let sec = TIME % 60;
                    setMinute(min);
                    setSecond(sec);
                    // setTime(TIME);
                    localStorage.setItem('TIME', TIME.toString());
                    // time = TIME;
                }, 1000);
                localStorage.setItem('timerId1', time_counter_id.toString());
                //console.log("Timer 1", time_counter_id);

                if (localStorage.getItem('timerId2')) {
                    clearInterval(parseInt(localStorage.getItem('timerId2')));
                }
                let localStorage_set_id = setInterval(() => {
                    // mapToLocalStorage(answer);
                    localStorageToServer();
                }, 30000);//30s
                localStorage.setItem('timerId2', localStorage_set_id.toString());
                //console.log("Timer 2", localStorage_set_id);




                // setTimerId1(time_counter_id);
                // setTimerId2(localStorage_set_id);


            }

            setLoader(false);
        }).catch((er) => {
            //console.log(er.message);
        })


    }, [])
    const answerHandler = (env) => {
        const val = env.target.value;
        const id = env.target.id;
        answer.set(id, val);
        if (val === '') {
            answer.delete(id, val);
        }
        setTimeout(()=>{mapToLocalStorage(answer)},0);
        setAnswer(new Map(answer));
    }
    const mcqHandler = (env) => {
        const val = env.target.value;
        const id = env.target.id
        answer.set(id, val)
        if (val === '') {
            answer.delete(id, val);
        }
        setTimeout(()=>{mapToLocalStorage(answer)},0);
        setAnswer(new Map(answer));
    }
    const submitHandler = () => {
        // validation
        // //console.log(answer.size)
        // for(let it of answer){
        //     //console.log("it",it);
        // }
        // if (answer.size !== questions.length) {
        //     setError(true);
        // }
        // else {
        //anwser is map with id as question id and value as value written in input


        // let responses = [];
        // for (let it of answer) {
        //     responses.push({ ques_id: it[0], ans_given: it[1] });
        // }
        // clearInterval(time_counter_id);
        // clearInterval(localStorage_set_id);
        let timerId1 = parseInt(localStorage.getItem('timerId1'));
        let timerId2 = parseInt(localStorage.getItem('timerId2'));
        clearInterval(timerId1);
        clearInterval(timerId2);
        let responses = mapToArrayResponse(answer);
        mapToLocalStorage(answer);
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
            setModal(true);
            localStorage.removeItem('data');
            localStorage.removeItem('expTime');
            localStorage.removeItem('formId');
            localStorage.removeItem('userId');
            localStorage.removeItem('TIME');
            localStorage.removeItem('timerId1');
            localStorage.removeItem('timerId2');
            router.push('/dashboard');
        }).catch((er) => {
            //console.log('Error');
            localStorage.removeItem('data');
            localStorage.removeItem('expTime');
            localStorage.removeItem('formId');
            localStorage.removeItem('userId');
            localStorage.removeItem('TIME');
            localStorage.removeItem('timerId1');
            localStorage.removeItem('timerId2');
        })
    }
    // }
    return <>
        <div className={style.timer_style}>
            <strong>Time Remains</strong>
            <br />
            <p><span>min : {minute} - sec: {second}</span></p>
            <p>Don't leave or refresh <br /> the page until submitted</p>
        </div>

        {loader && <Loader></Loader>}
        {modal && <Modal val={{ type: "success", msg: "Response Submitted successfully" }}></Modal>}
        {error && <Modal val={{ type: "Error", msg: "Validation error, Do not leave any input blank" }}></Modal>}
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
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
        {responded && <h1 className={style.center}>Already Responded</h1>}
        {owner && <h1 className={style.center}>The owner can't attempt his own form</h1>}
        {notInit && <h1 className={style.center}>The user haven't initiated to attemp this form</h1>}
        {!responded && !owner && !notInit &&
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
                            <form>
                                <div className={style.answer}>
                                    <input type='radio' value='A' name='option' id={data._id} className='a' onChange={mcqHandler} checked={answer.get(data._id) == "A"}></input><p>{data.a}</p>
                                </div>
                                <div className={style.answer}>
                                    <input type='radio' value='B' name='option' id={data._id} className='a' onChange={mcqHandler} checked={answer.get(data._id) == "B"}></input><p>{data.b}</p>
                                </div>
                                <div className={style.answer}>
                                    <input type='radio' value='C' name='option' id={data._id} className='a' onChange={mcqHandler} checked={answer.get(data._id) == "C"}></input><p>{data.c}</p>
                                </div>
                                <div className={style.answer}>
                                    <input type='radio' value='D' name='option' id={data._id} className='a' onChange={mcqHandler} checked={answer.get(data._id) == "D"}></input><p>{data.d}</p>
                                </div>
                            </form>
                        </div>
                    </>
                }
            })

        }
    </>
}