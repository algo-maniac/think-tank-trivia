import { Avatar } from "@mui/material";
import './FormCard.css'
import Link from "next/link";
const Page=()=>{
    return <>
        <div className="card1">
            <div className="header1">
                <img src="exam.png" className="image"></img>
                {/* name */}
                <span>Form-2</span>
            </div>
            <div className="msg">
                {/* date */}
                <span>Published on<br></br> 11/10/2023</span>
            </div>
            <div className="response">
                {/* responses */}
                <span>10 Responded</span>
            </div>
        </div>
    </>
}
export default Page;