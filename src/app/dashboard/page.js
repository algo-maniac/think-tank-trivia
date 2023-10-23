"use client"
import Image from "next/image";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import style from './style.module.css'
import { Avatar } from "@mui/material";
import ResponseCard from "@/components/ResponseCard";
import { useEffect, useState } from "react";
import UserContext from "@/context/userContext/userContext";
import { useContext } from "react";
import Loader from "@/components/Loader";
import { signOut } from "next-auth/react";
import Modal from '@/components/Modal'
export default function Dashboard() {
  const [loaderFlag, setLoader] = useState(true);
  const [modal,setModal]=useState(false);
  const [error,setError]=useState(false);
  let [data, setData] = useState([]);
  const { user,auth_session } = useContext(UserContext);
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
        console.log(data)
        setData(data.formsList);
        setLoader(false)
        setModal(true);
      }).catch((er) => {
        console.log('Error');
        setError(true);
      })
    }
    // name,date,responses.length,formid
    fetchDetails();
  }, [])
  return <>
    {modal && <Modal val={{type:"success",msg:"All the Forms fetched successfully"}}></Modal>}
    {error && <Modal val={{type:"error",msg:"Failed from Server Side"}}></Modal>}
    <div className={style.main}>
      <div className={style.leftpart}>
        <div className={style.logo}>
          <h1 className={style.heading}>ThinkTankTrivia</h1>
          <div className={style.links}>
            <Link href={'/dashboard'} className={style.anchor}>
              <div className={style.sidelinks}>
                Dashboard
              </div>
            </Link>
            <Link href={'/search-form'} className={style.anchor}> 
              <div className={style.sidelinks}>
                Search-Form
              </div>
            </Link>
            <Link href={'/analytics'} className={style.anchor}>
              <div className={style.sidelinks}>
                Analytics
              </div>
            </Link>
          </div>
        </div>
        <div className={style.user}>
          <div className={style.avatar}>
            <img src={auth_session.user.image} alt={user.name} height={30} width={50} />
          </div>
          <div className={style.info}>
            <span className={style.name}>{user.username}</span>
            <span className={style.logout} onClick={() => { signOut() }}>Logout</span>
          </div>
        </div>
      </div>
      <div className={style.rightpart}>
        <div className={style.header}>
          <div className={style.content}>Home</div>
          <div className={style.buttons}>
            <button className={style.button27} role="button"><Link href={'dashboard/create-form'} className={style.anchor}>+Create Form</Link></button>
            <button className={style.button26} role="button"><Link href={'dashboard/create-quiz'} className={style.anchor}>+Create Quiz</Link></button>
          </div>
        </div>
        <div className={style.formscontainer}>
          <div className={style.sorting}>
            All Forms
          </div>
          {!loaderFlag && <div className={style.container}>
            {
              data.map(function (val) {
                return <ResponseCard data={val} key={val._id}></ResponseCard>
              })
            }
          </div>}
          {loaderFlag && <div>
            <Loader></Loader>
          </div>}
        </div>
      </div>
    </div>
  </>
}
