"use client"
import { use, useState } from 'react';
import style from './../create-form/style.module.css'
import style1 from './style1.module.css'
import CreateQuestion from '@/components/CreateQuestion';
import CreateMcq from '@/components/CreateMcq';
import Modal from '@/components/Modal';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
export default function Page() {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(true);
    const [modal, setModal] = useState(false);
    const [question, setQuestion] = useState("");
    const [a, seta] = useState("");
    const [b, setb] = useState("");
    const [c, setc] = useState("");
    const [d, setd] = useState("");
    const [answer, setAnswer] = useState("A");
    const [error, setError] = useState(false);
    const [duration, setDuration] = useState(5);
    const [formName, setFormName] = useState('form-name');
    const { user, auth_status } = useContext(UserContext);
    const router=useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const questionHandler1 = (env) => {
        setQuestion(env.target.value)
    }
    const optionHandler1 = (env) => {
        seta(env.target.value);
    }
    const optionHandler2 = (env) => {
        setb(env.target.value);
    }
    const optionHandler3 = (env) => {
        setc(env.target.value);
    }
    const optionHandler4 = (env) => {
        setd(env.target.value);
    }
    const addMCQ = () => {
        if (question === '' || a === '' || b === '' || c === '' || d === '' || answer === '') {
            setError(true);
        }
        else {
            setData([...data, {
                id: data.length,
                value: { type: "MCQ", question: question, a: a, b: b, c: c, d: d, answer: answer }
            }])
        }
    }
    const answerHandler = (env) => {
        const val = env.target.value;
        setAnswer(val)
    }
    const submitHandler = () => {
        // console.log(question,a,b,c,d);
        addMCQ();
        seta("");
        setb("");
        setc("");
        setd("");
        setQuestion("");
        setAnswer("A");
    }
    const publishHandler = () => {
        // console.log(data,user._id);
        fetch('/api/create-quiz', {
            method: 'POST',
            body: JSON.stringify({
                data: data,
                user_id: user._id,
                quiz_name: formName,
                duration: duration == "" ? 1 : parseInt(duration)
            })
        })
            .then(res => res.json())
            .then(data => { setModal(true) })
            .catch(err => console.log(err.message));
    }
    const formNameHandler = (env) => {
        setFormName(env.target.value);
        // console.log("form name ",formName,typeof formName)
    }
    const durationHandler = (env) => {
        setDuration(env.target.value);
        // console.log("duration ",duration,typeof duration)
    }
    return <>
        {error && <Modal val={{ type: "error", msg: "Validation Error, Do need leave any input as blank" }}></Modal>}
        {modal && <Modal val={{ type: "success", msg: "Forms created successfully" }}></Modal>}
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.mode}>
                <button className={style.button4} onClick={publishHandler}>Publish</button>
            </div>
        </div>
        <div className={style.main}>
            <div className={style.header1}>
                <div>
                    <h1>Control Panel</h1>
                    <span>Enter the quiz name </span>
                    <input type="text" value={formName} onChange={formNameHandler} />
                    <br />
                    <span>Enter the duration (in minutes) </span>
                    <input type="number" value={duration} onChange={durationHandler} />
                </div>
            </div>
            <div className={style.controlpanel}>
                <div className={style.mcq}>
                    <p>Write the question?</p>
                    <textarea placeholder='Write your question here' className={style.question} value={question} onChange={questionHandler1}></textarea>
                    <p>Select Options</p>
                    <div className={style.options}>
                        <div className={style.first}>
                            A: <input onChange={optionHandler1} value={a}></input><br></br>
                            B: <input onChange={optionHandler2} value={b}></input>
                        </div>
                        <div className={style.second}>
                            C: <input onChange={optionHandler3} value={c}></input><br></br>
                            D: <input onChange={optionHandler4} value={d}></input>
                        </div>
                    </div>
                    <p>Choose the correct option</p>
                    <div className={style.options}>
                        <div className={style.first}>
                            <select onChange={answerHandler}>
                                <option value={'A'} onChange={answerHandler}>A</option>
                                <option value={'B'} onChange={answerHandler}>B</option>
                                <option value={'C'} onChange={answerHandler}>C</option>
                                <option value={'D'} onChange={answerHandler}>D</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={style.submit}>
                    <button className={style.button9} onClick={submitHandler}>Submit</button>
                </div>
            </div>
            {flag &&
                data.map(function (val) {
                    if (val.value.type === "MCQ") {
                        return <CreateMcq key={val.id} content={val.value} />
                    }
                    else {
                        return <CreateQuestion key={val.id} content={val.value.question} />
                    }
                })
            }
        </div>
    </>
}