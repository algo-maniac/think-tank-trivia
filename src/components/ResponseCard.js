import { Avatar } from "@mui/material";
import './ResponseCard.css'
import Link from "next/link";
const Page=(props)=>{
    // console.log('props',props.data)
    const date=new Date(props.data.date);
    var day=date.getDate();
    var month=date.toLocaleString('default', { month: 'long' });
    var year=date.getFullYear();
    var str=`${day} ${month},${year}`
    return <>
        <div className="card1">
            <Link href={`/dashboard/${props.data._id}`}>
            <div className="header1">
                <img src="exam.png" className="image"></img>
                {/* name */}
                <span>{props.data.form_name}</span>
            </div>
            <div className="msg">
                {/* date */}
                <span>Published on<br></br> {str}</span>
            </div>
            <div className="response">
                {/* responses */}
                <span>{props.data.responses_no} Responded</span>
            </div>
            </Link>
        </div>
    </>
}
export default Page;