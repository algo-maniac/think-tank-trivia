import { useEffect, useState } from 'react';
import style from './FormHeader.module.css'
import dark from './darkFormHeader.module.css'
const FormHeader=(props)=>{
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
    return<>
        <div className={`${mode?style.header:dark.header}`}>
            <h2 className={`${mode?style.heading:dark.heading}`}>{props.formName}</h2>
            <hr></hr>
            <p className={`${mode?style.msg:dark.msg}`}>This is a form to collect the data from all the student</p>
        </div>
    </>
}
export default FormHeader