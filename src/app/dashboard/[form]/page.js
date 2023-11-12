"use client"
import style from './style.module.css'
import dark from './dark.module.css'
import FormHeader from '../../../components/FormHeader'
import MCQ from '../../../components/MCQ'
import Question from '@/components/Question';
import { useEffect, useState } from 'react';
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FaLightbulb } from 'react-icons/fa'
export default function Page({ params }) {
    const { auth_status } = useContext(UserContext);
    const [mode,setMode]=useState(true)
    let [response, setResponse] = useState([]);
    let [all_form, setAllForm] = useState(true);
    let [all_response, setAllResponse] = useState(false);
    useEffect(()=>{
        const modes=()=>{
        const g=localStorage.getItem('website_mode');
        if(g===null){
            setMode(true);
            localStorage.setItem('website_mode',true);
        }
        else{
            let f=true;
            if(g==='false'){
            f=false;
            }
            else{
            f=true
            }
            setMode(f)
        }
        }
        modes()
        setAllForm(!all_form);
        setAllForm(!all_form);
        setAllResponse(!all_response)
        setAllResponse(!all_response)
    },[])
    useEffect(()=>{
        const modes=()=>{
          const g=localStorage.getItem('website_mode');
          if(g===null){
            setMode(true);
            localStorage.setItem('website_mode',true);
          }
          else{
            let f=true;
            if(g==='false'){
              f=false;
            }
            else{
              f=true
            }
            setMode(f)
          }
        }
        modes()
        setAllForm(!all_form);
        setAllForm(!all_form);
        setAllResponse(!all_response)
        setAllResponse(!all_response)
      },[])
      const modeHandler=()=>{
        if(mode===true){
          setMode(false);
          localStorage.setItem('website_mode',false);
        }      
        else{
          setMode(true);
          localStorage.setItem('website_mode',true);
        }
      }
    const router = useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const formId = params.form;
    const [question, setQuestion] = useState([]);
    const [formName,setFormName]=useState("");
    useEffect(() => {
        async function fetchForm() {
            let data = await fetch(`/api/dashboard/${formId}`);
            data = await data.json();
            // console.log(data)
            // console.log("data received at client",data);
            setQuestion(data.form.questions)
            setFormName(data.form.form_name);
        }
        fetchForm();
    }, [])
    return <>
        <div className={`${mode?style.header:dark.header}`}>
            <div className={`${mode?style.logo:dark.logo}`}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
            </div>
            <div className={`${mode?style.nav:dark.nav}`}>
                <div><a href={"/dashboard"}>DashBoard</a></div>
                <div><a href={`/dashboard/${formId}`}>Preview</a></div>
                <div><a href={`/dashboard/${formId}/share-portal`}>Share</a></div>
                <div><a href={`/dashboard/${formId}/response`}>Response</a></div>
            </div>
            <div className={`${mode?style.iconGrid:dark.iconGrid}`} onClick={modeHandler}>
              <FaLightbulb className={`${mode?style.bulb:dark.bulb}`}></FaLightbulb>
            </div>
        </div>
        <div className={`${mode?style.outer:dark.outer}`}>
        <div className={`${mode?style.contentheader:dark.contentheader}`}>
            <img src={`${mode?"/form-header1.png":"/nightmode.png"}`} height={"100%"} width={"100%"}></img>
        </div>
        {/* Pass the data by props */}
        <FormHeader formName={formName}></FormHeader>
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
        </div>
    </>
}