import { useEffect, useState } from 'react';
import style from'./MCQ.module.css'
import dark from './darkMCQ.module.css'
const MCQ=(props)=>{
    // console.log(props.data);
    const {data}=props;
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
    })
    return <>
    <div className={`${mode?style.mcqHeader:dark.mcqHeader}`}>
        <div className={`${mode?style.question:dark.question}`}>
            <p>{data.question}</p>
        </div>
        <hr></hr>
        <div className={`${mode?style.answer:dark.answer}`}>
            <input type='radio' value={true}></input><p>{data.a}</p>
        </div>
        <div className={`${mode?style.answer:dark.answer}`}>
            <input type='radio' value={true}></input><p>{data.b}</p>
        </div>
        <div className={`${mode?style.answer:dark.answer}`}>
            <input type='radio' value={true}></input><p>{data.c}</p>
        </div>
        <div className={`${mode?style.answer:dark.answer}`}>
            <input type='radio' value={true}></input><p>{data.d}</p>
        </div>
    </div>
    </>
}
export default MCQ;