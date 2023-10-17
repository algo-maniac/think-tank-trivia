"use client"
import Image from "next/image";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import "./style.css"
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
    {modal && <Modal val={{type:"success",msg:"Forms fetched successfully"}}></Modal>}
    {error && <Modal val={{type:"error",msg:"Failed from Server Side"}}></Modal>}
    <div className="main">
      <div className="left-part">
        <div className="logo">
          <h1 className="heading">ThinkTankTrivia</h1>
          <div className="links">
            <Link href={'/dashboard'}>
              <div className="sidelinks">
                Dashboard
              </div>
            </Link>
            <Link href={'/search-form'}>
              <div className="sidelinks">
                Search-Form
              </div>
            </Link>
            <Link href={'/analytics'}>
              <div className="sidelinks">
                Analytics
              </div>
            </Link>
          </div>
        </div>
        <div className="user">
          <div className="avatar">
            <img src={auth_session.user.image} alt={user.name} height={30} width={50} />
          </div>
          <div className="info">
            <span className="name">{user.username}</span>
            <span className="logout" onClick={() => { signOut() }}>Logout</span>
          </div>
        </div>
      </div>
      <div className="right-part">
        <div className="header">
          <div className="content">Home</div>
          <div className="buttons">
            <button className="button-27" role="button"><Link href={'dashboard/create-form'}>+Create Form</Link></button>
            <button className="button-26" role="button"><Link href={'dashboard/create-quiz'}>+Create Quiz</Link></button>
          </div>
        </div>
        <div className="forms-container">
          <div className="sorting">
            All Forms
          </div>
          {!loaderFlag && <div className="container">
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
