"use client"
import { use, useDebugValue, useEffect, useState } from 'react';
import style from './style.module.css'
import CreateQuestion from '@/components/CreateQuestion';
import CreateMcq from '@/components/CreateMcq';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
<<<<<<< HEAD
export default function Page() {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [question, setQuestion] = useState("");
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(false);
    const [a, seta] = useState("");
    const [b, setb] = useState("");
    const [c, setc] = useState("");
    const [d, setd] = useState("");
    const { user } = useContext(UserContext);
    const mcqHandler = () => {
=======
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
    const {user,auth_status}=useContext(UserContext);
    const router=useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const mcqHandler=()=>{
>>>>>>> d4bd070d647ae8aeac5386981f875b3c7741e3e1
        setFlag(true);
    }
    const questionHandler = () => {
        setFlag(false);
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
        if (question === '' || a === '' || b === '' || c === '' || d === '') {
            setError(true);
        }
        else {
            setData([...data, {
                id: data.length,
                value: { type: "MCQ", question: question, a: a, b: b, c: c, d: d }
            }])
        }
    }
    const addQuestion = () => {
        if (question === '') {
            setError(true);
        }
        else {
            setData([...data, {
                id: data.length,
                value: { type: "TEXT", question: question }
            }])
        }
    }
    const submitHandler = () => {
        // console.log(question,a,b,c,d);
        if (flag) {
            addMCQ();
        }
        else {
            addQuestion();
        }
    }
    const formsubmitHandler = () => {
        // console.log("data form client : ",data);
        fetch("/api/create-form", {//automatically make a call on current domain
            method: 'POST',
            body: JSON.stringify({
                data: data,
                user_id: user._id,
                form_name: "form-name",//tuhin add the form name here
            }),
            header: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            return data.json();
        }).then((data) => {
            setModal(true);
<<<<<<< HEAD
        }).catch((er) => {
            console.log(er)
=======
        }).catch((er)=>{
            // console.log(er)
>>>>>>> d4bd070d647ae8aeac5386981f875b3c7741e3e1
            setError(true);
        })
    }
    return <>
        {modal && <Modal val={{ type: "success", msg: "Forms created successfully" }}></Modal>}
        {error && <Modal val={{ type: "error", msg: "Validation Error, Do need leave any input as blank" }}></Modal>}
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