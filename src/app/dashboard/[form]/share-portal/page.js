"use client"
import style from './style.module.css'
import dark from './dark.module.css'
import { FaGithub } from 'react-icons/fa';
import copy from 'copy-to-clipboard'
import Link from 'next/link';
import UserContext from '@/context/userContext/userContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLightbulb } from 'react-icons/fa';
export default function Page({ params }) {
    const { auth_status } = useContext(UserContext);
    const router = useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const url = window.location.href.split('/');
    const formId = url[4];
    const copyLinkHandler = () => {
        copy(document.getElementById('input').value);
    }
    const [mode,setMode]=useState(true);
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
        <div className={`${mode?style.shareportal:dark.shareportal}`}>
            <div className={`${mode?style.shareheader:dark.shareheader}`}>
                <h1>Share It</h1>
            </div>
            <div className={`${mode?style.sharecontent:dark.sharecontent}`}>
                <div className={`${mode?style.dialog:dark.dialog}`}>
                    <h3>Your Form is ready to deploy</h3>
                    <p>Share the link directly on any site</p>
                </div>
                <h4>Form Link</h4>
                <div className={`${mode?style.inputcard:dark.inputcard}`}>
                    <input value={formId} id='input'></input>
                    <button className={`${mode?style.button4:dark.button4}`} onClick={copyLinkHandler}>Copy</button>
                    <button className={`${mode?style.button3:dark.button3}`}>Live</button>
                </div>
            </div>
            <div className={`${mode?style.sharefooter:dark.sharefooter}`}>
                <p className={`${mode?style.shareLink:dark.shareLink}`}>Copy the FormId and paste it <b><Link href={'/search-form'}>Here</Link></b></p>
            </div>
        </div>
        </div>
    </>
}