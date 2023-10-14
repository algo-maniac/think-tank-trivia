import Image from "next/image";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import "./style.css"
import { Avatar } from "@mui/material";
import ResponseCard from "@/components/ResponseCard";
export default function Dashboard() {
  return <>
  <div className="main">
    <div className="left-part">
      <div className="logo">
        <h1 className="heading">ThinkTankTrivia</h1>
        <div className="links">
          <Link href={'/dashboard'}>
            <div>
              Dashboard
            </div>
          </Link>
          <Link href={'/search-form'}>
          <div>
            Search-Form
          </div>
          </Link>
          <Link href={'/analytics'}>
          <div>
            Analytics
          </div>
          </Link>
        </div>
      </div>
      <div className="user">
        <div className="avatar">
          <Avatar className="img"></Avatar>
        </div>
        <div className="info"> 
          <span className="name">Tuhin Saha</span>
          <span className="logout">Logout</span>
        </div>
      </div>
    </div>
    <div className="right-part">
      <div className="header">
        <div className="content">Home</div>
        <div className="buttons">
        <button className="button-27" role="button"><Link href={'dashboard/create-form'}>+Create Form</Link></button>
        <button className="button-26" role="button">+Create Quiz</button>
        </div>
      </div>
      <div className="forms-container">
          <div className="sorting">
            All Forms
          </div>
          <div className="container">
            <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard>
            <ResponseCard></ResponseCard>
          </div>
      </div>
    </div>
  </div>
  </>
}
