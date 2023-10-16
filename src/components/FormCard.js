import { Avatar } from "@mui/material";
import './FormCard.css'
import Link from "next/link";
const Page=(props)=>{
    console.log(props);
    const date=new Date(props.data.date);
    var day=date.getDate();
    var month=date.toLocaleString('default', { month: 'long' });
    var year=date.getFullYear();
    var str=`${day} ${month},${year}`
    return <>
        <div className="card1">
            <Link href={`attempt/form/${props.data._id}`} className="links">
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