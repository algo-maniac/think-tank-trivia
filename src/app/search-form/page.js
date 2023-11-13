"use client"
import { useEffect, useState } from 'react'
import style from './style.module.css'
import dark from './dark.module.css'
import ResponseCard from '@/components/ResponseCard'
import FormCard from '@/components/FormCard'
import Loader from '@/components/Loader'
import Notfound from '@/components/Notfound'
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { FaLightbulb } from 'react-icons/fa'
export default function Page() {
    const [flag, setFlag] = useState(true);
    const [loader, setLoader] = useState(false);
    const [link, setLink] = useState(true);
    const [search, setSearch] = useState(true);
    const [forms, setForms] = useState(false);
    const [input, setInput] = useState('');
    const [formData, setData] = useState([]);
    const [notFound, setNotfound] = useState(false);
    const { auth_status } = useContext(UserContext);
    const [mode,setMode]=useState(true)
    const router = useRouter();
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
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
    const filterHandler = () => {
        setFlag(!flag);
    }
    const linkTrue = () => {
        setLink(true);
    }
    const linkFalse = () => {
        setLink(false);
    }
    const inputHandler = (env) => {
        setInput(env.target.value)
    }
    const submitHandler = () => {
        setLoader(true);
        setSearch(false);
        fetch("/api/search-form", {
            method: 'POST',
            body: JSON.stringify({
                mode: link ? "URL" : "UserID",
                input: input
            })
            ,
            header: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            return data.json();
        }).then((data) => {
            setLoader(false);
            // if(mode==="URL"){

            // }
            // else{
            if (data != undefined) {
                if (link === true) {
                    setData([data.form]);
                }
                else {
                    setData(data.formsList);
                }
                setForms(true);
                setNotfound(false);
            }
            else {
                setNotfound(true);
            }
            // }
        }).catch((er) => {
            console.log('Error');
            console.log(er)
        })
    }
    return <>
        <div className={`${mode?style.header:dark.header}`}>
            <div className={`${mode?style.logo:dark.logo}`}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
            </div>
            <div className={`${mode?style.nav:dark.nav}`}>
                <div><a href={"/"}>Home</a></div>
                <div><a href={"/analytics"}>Analytics</a></div>
                <div><a href={"/dashboard"}>DashBoard</a></div>
            </div>
            <div className={`${mode?style.iconGrid:dark.iconGrid}`} onClick={modeHandler}>
                <FaLightbulb className={`${mode?style.bulb:dark.bulb}`}></FaLightbulb>
          </div>
        </div>
        <div className={`${mode?style.outer:dark.outer}`}>
        <div className={`${mode?style.searchpanel:dark.searchpanel}`}>
            <div className={`${mode?style.searchbox:dark.searchbox}`}>
                <div className={`${mode?style.searchinput:dark.searchinput}`}>
                    <div className={`${mode?style.first:dark.first}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                    </div>
                    <div className={`${mode?style.second:dark.second}`}>
                        <input type='text' placeholder='search by userID' onChange={inputHandler}></input>
                    </div>
                </div>
                <div className={`${mode?style.filterbtn:dark.filterbtn}`}>
                    <button className={`${mode?style.button31:dark.button31}`} onClick={filterHandler}>Filter</button>
                </div>
                <div className={`${`${mode?style.searchbtn:dark.searchbtn}`}`}>
                    <button className={`${mode?style.button31:dark.button31}`} onClick={submitHandler}>Search</button>
                </div>
            </div>
        </div>
        {flag && <div className={`${mode?style.filteroption:dark.filteroption}`}>
            <div className={`${mode?style.container:dark.container}`}>
                <div className={`${style.link} ${link && style.borderBottom}`} onClick={linkTrue}>
                    <span>Raw-Link</span>
                </div>
                <div className={`${style.user} ${!link && style.borderBottom}`} onClick={linkFalse}>
                    <span>UserID</span>
                </div>
            </div>
        </div>}
        <div className={style.individual}>
            {/* <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard> */}
        </div>
        {search && <div className={`${mode?style.searchingContent:dark.searchingContent}`}>
            <div className={`${mode?style.searchingLogo:dark.searchingLogo}`}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></div>
            <div><h1>Search By user-name/Form-ID</h1></div>
        </div>}
        {
            loader && <div><Loader></Loader></div>
        }
        {/* dummy data */}
        {forms && <div className={style.formCard}>
            {
                formData?.map(function (val) {
                    return <FormCard data={val}></FormCard>
                })
            }
        </div>}
        {notFound && <Notfound></Notfound>
        }
        </div>
    </>
}