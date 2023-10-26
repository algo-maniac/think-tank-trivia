"use client"
import { use, useState } from 'react';
import style from './../create-form/style.module.css'
import style1 from './style1.module.css'
import CreateQuestion from '@/components/CreateQuestion';
import CreateMcq from '@/components/CreateMcq';
import Modal from '@/components/Modal';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
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
    const { user } = useContext(UserContext);
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
    }
    const publishHandler = () => {
        console.log(data, user._id);
        fetch('/api/create-quiz', {
            method: 'POST',
            body: JSON.stringify({
                data: data,
                user_id: user._id,
                quiz_name: "Quiz",
            })
        })
            .then(res => res.json())
            .then(data => { setModal(true) })
            .catch(err => console.log(err.message));
    }
    return <>
        {error && <Modal val={{ type: "error", msg: "Validation Error, Do need leave any input as blank" }}></Modal>}
        {modal && <Modal val={{ type: "success", msg: "Forms created successfully" }}></Modal>}
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
            </div>
            <div className={style.nav}>
                <div><a href={"/"}>Home</a></div>
                {/* <div><a href>Preview</a></div> */}
                <div><a href={"/analytics"}>Analytics</a></div>
                <div><a href={"/dashboard"}>DashBoard</a></div>
            </div>
            <div className={style.mode}>
                <button className={style.button4} onClick={publishHandler}>Publish</button>
            </div>
        </div>
        <div className={style.main}>
            <div className={style.header1}>
                <div>
                    <h1>Control Panel</h1>
                </div>
            </div>
            <div className={style.controlpanel}>
                <div className={style.mcq}>
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