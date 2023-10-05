import './Card.css'
import Avatar from '@mui/material/Avatar';
const Card=()=>{
    return <>
        <div className="card">
            <div className="header">
                <Avatar className="avatar">A</Avatar>
                <span>Arpit Sagar</span>
            </div>
            <div className="msg">
                <span>Responded on 12/12/2003</span>
            </div>
        </div>
    </>
}
export default Card;