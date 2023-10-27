"use client"
import style from './style.module.css'
import FormHeader from '../../../components/FormHeader'
import MCQ from '../../../components/MCQ'
import Question from '@/components/Question';
import { useEffect, useState } from 'react';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
export default function Page({ params }) {
    const { auth_status } = useContext(UserContext);
    const router = useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const formId = params.form;
    const [question, setQuestion] = useState([]);
    useEffect(() => {
        async function fetchForm() {
            let data = await fetch(`/api/dashboard/${formId}`);
            data = await data.json();
            // console.log(data)
            // console.log("data received at client",data);
            setQuestion(data.form.questions)
        }
        fetchForm();
    }, [])
    return <>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
            </div>
            <div className={style.nav}>
                <div><a href={"/dashboard"}>DashBoard</a></div>
                <div><a href={`/dashboard/${formId}`}>Preview</a></div>
                <div><a href={`/dashboard/${formId}/share-portal`}>Share</a></div>
                <div><a href={`/dashboard/${formId}/response`}>Response</a></div>
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
            question.map(function (data) {
                if (data.ques_type == "TEXT") {
                    return <Question data={data} key={data._id}></Question>
                }
                else {
                    return <MCQ data={data} key={data._id}></MCQ>
                }
            })
        }
    </>
}