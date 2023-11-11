"use client"
import Image from "next/image";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import style from './style.module.css'
import dark from './dark.module.css'
import { Avatar } from "@mui/material";
import ResponseCard from "@/components/ResponseCard";
import { useEffect, useState } from "react";
import UserContext from "@/context/userContext/userContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { signOut } from "next-auth/react";
import Modal from '@/components/Modal'
import Card from "@/components/Card";
import { MdDashboardCustomize } from "react-icons/md"
import { AiOutlineFileSearch } from "react-icons/ai"
import { IoMdAnalytics } from "react-icons/io"
import { FaLightbulb } from "react-icons/fa";

export default function Dashboard() {
  const [mode,setMode]=useState(true)
  const [loaderFlag, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  let [data, setData] = useState([]);

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
  const { user, auth_session, auth_status } = useContext(UserContext);
  const router = useRouter();
  if (auth_status == 'unauthenticated') {
    return router.push('/login');
  }

  useEffect(() => {
    const fetchDetails = () => {
      fetch("/api/dashboard", {//automatically make a call on current domain
        method: 'POST',
        body: JSON.stringify({ user_id: user._id }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((data) => {
        return data.json();
      }).then((data) => {
        //console.log(data)
        setData(data.formsList);
        setLoader(false)
        setModal(true);
      }).catch((er) => {
        //console.log('Error');
        setLoader(false)
        setError(true);
      });

      fetch(`/api/fetch-responses-list-user_id/${user._id}`, {
        method: 'GET'
      }).then((data) => {
        return data.json();
      }).then((data) => {
        if (data.ok == true) {
          // setFlag(true);
          setResponse(data.responses_list);
        }
        setLoader(false);
      }).catch((er) => {
        // console.log('Error');
      });

    }



    // name,date,responses.length,formid
    fetchDetails();


  }, [])
  return <>
    {modal && <Modal val={{ type: "success", msg: "All fetched successfully" }}></Modal>}
    {error && <Modal val={{ type: "error", msg: "Failed from Server Side" }}></Modal>}
    <div className={`${mode?style.main:dark.main}`}>
      <div className={`${mode?style.leftpart:dark.leftpart}`}>
        <div className={`${mode?style.upper:dark.upper}`}>
          <div className={`${mode?style.logo_icon:dark.logo_icon}`}>
            <Link href={"/"}><img src="./favicon.png" alt="loading" /></Link>
          </div>
          <div className={`${mode?style.logo_name:dark.logo_name}`}>
            <h3>Think-Fast-Trivia</h3>
          </div>
        </div>
        <div className={`${mode?style.middle:dark.middle}`}>
          <div className={`${mode?style.child:dark.child}`}>
            <Link href={"/dashboard"} style={{ textDecoration: 'none', color: 'white' }}><MdDashboardCustomize className={style.child_icons} /></Link>
            <Link href={"/dashboard"} style={{ textDecoration: 'none' }}><div className={style.child_link}>Dashboard</div></Link>
          </div>
          <div className={`${mode?style.child:dark.child}`}>
            <Link href={"/search-form"} style={{ textDecoration: 'none', color: 'white' }}><AiOutlineFileSearch className={style.child_icons} /></Link>
            <Link href={"/search-form"} style={{ textDecoration: 'none' }}><div className={style.child_link}>Search-Form</div></Link>
          </div>
          <div className={`${mode?style.child:dark.child}`}>
            <Link href={"/analytics"} style={{ textDecoration: 'none', color: 'white' }}><IoMdAnalytics className={style.child_icons} /></Link>
            <Link href={"/analytics"} style={{ textDecoration: 'none' }}><div className={style.child_link}>Analytics</div></Link>
          </div>
        </div>
        <div className={`${mode?style.lower:dark.lower}`}>
          <div className={`${mode?style.user_logo:dark.user_logo}`}>
            <img src={auth_session.user.image} alt={user.name} height={40}/>
          </div>
          <div className={`${mode?style.user_info:dark.user_info}`}>
            <div className={`${mode?style.user_name:dark.user_name}`}>
              <span>{user.username}</span>
            </div>
            <div className={`${mode?style.log_out:dark.log_out}`} onClick={() => { signOut() }}>
              <span>Logout</span>
            </div>
          </div>
        </div>

      </div>





      {/* ...................................................Right_side .............................................................*/}
      <div className={`${mode?style.rightpart:dark.rightpart}`}>
        <div className={`${mode?style.header:dark.header}`}>
          <Link href={"/"} style={{ textDecoration: 'none' }}><div className={`${mode?style.content:dark.content}`}>Home</div></Link>
          <div className={`${mode?style.buttons:dark.buttons}`}>
            {/* <button className={style.button27} role="button"><Link href={'dashboard/create-form'} className={style.anchor}>+Create Form</Link></button> */}
            <button className={`${mode?style.button26:dark.button26}`} role="button"><Link href={'dashboard/create-quiz'} style={{ textDecoration: 'none' }} className={`${mode?style.anchor:dark.anchor}`}>+Create Quiz</Link></button>
            <div className={`${mode?style.iconGrid:dark.iconGrid}`} onClick={modeHandler}>
              <FaLightbulb className={`${mode?style.bulb:dark.bulb}`}></FaLightbulb>
            </div>
          </div>
        </div>
        <div className={`${mode?style.outer:dark.outer}`}>
        <div className={`${mode?style.formscontainer:dark.formscontainer}`}>
          <div className={`${mode?style.selector:dark.selector}`}>
          <div className={`${mode?style.sorting:dark.sorting}`} onClick={() => { setAllForm(true); setAllResponse(false) }}>
            Forms
          </div>
          <div className={`${mode?style.sorting:dark.sorting}`} onClick={() => { setAllForm(false); setAllResponse(true) }}>
            Responses
          </div>
          </div>
          {!loaderFlag && <div className={`${mode?style.container:dark.container}`}>
            {all_form &&
              data.map(function (val) {
                return <ResponseCard data={val} key={val._id}></ResponseCard>
              })
            }
            {all_response &&
              response.map(function (data) {
                return <Card key={data._id} val={data}></Card>
              })
            }
          </div>}
        </div>
          {loaderFlag && <div>
            <Loader></Loader>
          </div>}
        </div>
      </div>
    </div>
  </>
}
