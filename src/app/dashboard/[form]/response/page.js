"use client"
import { useParams } from "next/navigation"
import style from "./style.module.css"
import dark from "./dark.module.css"
import Card from "@/components/Card"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FaLightbulb } from "react-icons/fa"
export default function Page({ params }) {
    const { auth_status } = useContext(UserContext);
    const router = useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const [mode,setMode]=useState(true)
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
    const [flag, setFlag] = useState(true);
    const [responseModal, setResponse] = useState(false);
    const [response, setRes] = useState([]);
    const [loader, setLoader] = useState(true);
    const url = window.location.href.split('/');
    const formId = url[4];
    const flagHandler = () => {
        setFlag(!flag);
    }
    const closeHandler = () => {
        setResponse(false);
    }
    // api call for response cards
    useEffect(() => {
        fetch(`/api/fetch-responses-list/${formId}`, {
            method: 'GET'
        }).then((data) => {
            return data.json();
        }).then((data) => {
            if (data.ok == true) {
                setFlag(true);
                setRes(data.responses_list);
            }
            setLoader(false);
        }).catch((er) => {
            console.log("error");
        })
    }, [])
    return <>
        {loader && <Loader></Loader>}
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
        <div className={`${mode?style.examContainer:dark.examContainer}`}>
            <div className={`${mode?style.header1:dark.header1}`}>
                <div className={`${flag && `${mode?dark.green:style.green}`} ${dark.header2}`} onClick={flagHandler}>
                    <span className={`${flag && style.blue}`}>Individual</span>
                </div>
                <div className={`${!flag && `${mode?dark.green:style.green}`} ${dark.header2}`} onClick={flagHandler}>
                    <span>Questions</span>
                </div>
            </div>
        </div>
        <div className={`${mode?dark.containerouter:style.containerouter}`}>
        {flag && <div className={`${mode?style.individual:dark.individual}`}>
            {
                response.map(function (data) {
                    return <Card key={data._id} val={data}></Card>
                })
            }
        </div>}
        </div>
        </div>
    </>
}