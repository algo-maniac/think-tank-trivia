"use client"
import { useState } from 'react'
import style from './style.module.css'
import ResponseCard from '@/components/ResponseCard'
import FormCard from '@/components/FormCard'
import Loader from '@/components/Loader'
export default function Page(){
    const [flag,setFlag]=useState(true);
    const [loader,setLoader]=useState(false);
    const [link,setLink]=useState(true);
    const [search,setSearch]=useState(true);
    const [forms,setForms]=useState(false);
    const [input,setInput]=useState('');
    const [formData,setData]=useState([]);
    const filterHandler=()=>{
        setFlag(!flag);
    }
    const linkTrue=()=>{
        setLink(true);
    }
    const linkFalse=()=>{
        setLink(false);
    }
    const inputHandler=(env)=>{
        setInput(env.target.value)
    }
    const submitHandler=()=>{
        setLoader(true);
        setSearch(false);
        fetch("http://localhost:3000/api/search-form",{
            method:'POST',
            body:JSON.stringify({
                mode:link?"URL":"UserID",
                input:input
            })
            ,
            header:{
                'Content-Type':'application/json'
            }
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            setData(data.formsList);
            setLoader(false);
            setForms(true)
        }).catch((er)=>{
            console.log('Error');
        })
    }
    return <>
       <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.nav}>
                <div><a href>Preview</a></div>
                <div><a href={"/share-portal"}>Share</a></div>
                <div><a href={"/response"}>Response</a></div>
                <div><a href="/setting">Setting</a></div>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>Light</button>
                <button className={style.button31}>Dark</button>
            </div>
        </div>
        <div className={style.searchpanel}>
            <div className={style.searchbox}>
                <div className={style.searchinput}>
                    <div className={style.first}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    </div>
                    <div className={style.second}>
                        <input type='text' placeholder='search by userID' onChange={inputHandler}></input>
                    </div>
                </div>
                <div className={style.filterbtn}>
                    <button className={style.button31} onClick={filterHandler}>Filter</button>
                </div>
                <div className={`${style.searchbtn}`}>
                    <button className={style.button31} onClick={submitHandler}>Search</button>
                </div>
            </div>
        </div>
        {flag && <div className={style.filteroption}>
            <div className={style.container}>
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
        {search && <div className={style.searchingContent}>
            <div className={style.searchingLogo}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></div>
            <div><h1>Search By user-name/Form-ID</h1></div>
        </div>}
        {
            loader && <div><Loader></Loader></div>
        }
        {/* dummy data */}
        {forms && <div className={style.formCard}>
            {
                formData.map(function(val){
                    return <FormCard data={val}></FormCard>
                })
            }
        </div>}
    </>
}