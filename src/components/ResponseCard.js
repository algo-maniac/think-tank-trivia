import { Avatar } from "@mui/material";
import './ResponseCard.css'
const Page=()=>{
    return <>
        <div className="card1">
            <div className="header1">
                <img src="exam.png" className="image"></img>
                <span>Form-1</span>
            </div>
            <div className="msg">
                <span>Published on 12/12/2003</span>
            </div>
            <div className="response">
                <span>12 Responded</span>
            </div>
        </div>
    </>
}
export default Page;