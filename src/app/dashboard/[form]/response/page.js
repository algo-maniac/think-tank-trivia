import { useParams } from "next/navigation"
import style from "./style.module.css"
import Card from "@/components/Card"
export default function Page({params}){
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
        <div className={style.examContainer}>
            <div className={style.header1}>
                <div>
                    <span>Individual</span>
                </div>
                <div>
                    <span>Questions</span>
                </div>
            </div>
        </div>
        <div className={style.individual}>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>

            <Card></Card>
        </div>
    </>
}