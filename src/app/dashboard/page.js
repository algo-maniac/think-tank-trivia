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
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { signOut } from "next-auth/react";
import Modal from '@/components/Modal'
import Card from "@/components/Card";
import { MdDashboardCustomize } from "react-icons/md"
import { AiOutlineFileSearch } from "react-icons/ai"
import { IoMdAnalytics } from "react-icons/io"
export default function Dashboard() {
  const [loaderFlag, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  let [data, setData] = useState([]);

  let [response, setResponse] = useState([]);
  let [all_form, setAllForm] = useState(true);
  let [all_response, setAllResponse] = useState(false);
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
    <div className={style.main}>
      <div className={style.leftpart}>
        {/* <div className={style.logo}>
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
        </div> */}

        <div className={style.upper}>
          <div className={style.logo_icon}>
            <Link href={"/"}><img src="./favicon.png" alt="loading" /></Link>
          </div>
          <div className={style.logo_name}>
            <h3>Think-Fast-Trivia</h3>
          </div>
        </div>
        <div className={style.middle}>
          <div className={style.child}>
            <Link href={"/dashboard"} style={{ textDecoration: 'none', color: 'white' }}><MdDashboardCustomize className={style.child_icons} /></Link>
            <Link href={"/dashboard"} style={{ textDecoration: 'none' }}><div className={style.child_link}>Dashboard</div></Link>
          </div>
          <div className={style.child}>
            <Link href={"/search-form"} style={{ textDecoration: 'none', color: 'white' }}><AiOutlineFileSearch className={style.child_icons} /></Link>
            <Link href={"/search-form"} style={{ textDecoration: 'none' }}><div className={style.child_link}>Search-Form</div></Link>
          </div>
          <div className={style.child}>
            <Link href={"/analytics"} style={{ textDecoration: 'none', color: 'white' }}><IoMdAnalytics className={style.child_icons} /></Link>
            <Link href={"/analytics"} style={{ textDecoration: 'none' }}><div className={style.child_link}>Analytics</div></Link>
          </div>
        </div>
        <div className={style.lower}>
          <div className={style.user_logo}>
            <img src={auth_session.user.image} alt={user.name} height={40}/>
          </div>
          <div className={style.user_info}>
            <div className={style.user_name}>
              <span>{user.username}</span>
            </div>
            <div className={style.log_out} onClick={() => { signOut() }}>
              <span>Logout</span>
            </div>
          </div>
        </div>

      </div>





      {/* ...................................................Right_side .............................................................*/}
      <div className={style.rightpart}>
        <div className={style.header}>
          <Link href={"/"} style={{ textDecoration: 'none' }}><div className={style.content}>Home</div></Link>
          <div className={style.buttons}>
            {/* <button className={style.button27} role="button"><Link href={'dashboard/create-form'} className={style.anchor}>+Create Form</Link></button> */}
            <button className={style.button26} role="button"><Link href={'dashboard/create-quiz'} style={{ textDecoration: 'none', color: 'white' }} className={style.anchor}>+Create Quiz</Link></button>
          </div>
        </div>
        <div className={style.formscontainer}>
          <div className={style.sorting} onClick={() => { setAllForm(true); setAllResponse(false) }}>
            All Forms
          </div>
          <div className={style.sorting} onClick={() => { setAllForm(false); setAllResponse(true) }}>
            All Responses
          </div>
          {!loaderFlag && <div className={style.container}>
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
          {loaderFlag && <div>
            <Loader></Loader>
          </div>}
        </div>
      </div>
    </div>
  </>
}
