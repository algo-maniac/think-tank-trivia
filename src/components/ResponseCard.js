import { Avatar } from "@mui/material";
import style from './ResponseCard.module.css'
import dark from './darkResponse.module.css'
import Link from "next/link";
import { useEffect, useState } from "react";
const Page=(props)=>{
    // console.log('props',props.data)
  const [mode,setMode]=useState(true)
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
  })
    const date=new Date(props.data.date);
    var day=date.getDate();
    var month=date.toLocaleString('default', { month: 'long' });
    var year=date.getFullYear();
    var str=`${day} ${month},${year}`
    return <>
        <div className={`${mode?style.card1:dark.card1}`}>
            <Link href={`/dashboard/${props.data._id}`} className={`${mode?style.anchor:dark.anchor}`}>
            <div className={style.header1}>
                <img src="exam.png" className={style.image}></img>
                {/* name */}
                <span>{props.data.form_name}</span>
            </div>
            <div className={`${mode?style.msg:dark.msg}`}>
                {/* date */}
                <span>Published on<br></br> {str}</span>
            </div>
            <div className={`${mode?style.response:dark.response}`}>
                {/* responses */}
                <span>{props.data.responses_no} Responded</span>
            </div>
            </Link>
        </div>
    </>
}
export default Page;