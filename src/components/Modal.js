import { useState } from 'react'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck,faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
const Modal=(props)=>{
    const type=props.val.type;
    const msg=props.val.msg;
    console.log(type,msg);
    const [flag,setFlag]=useState(true);
    console.log(flag);
    const flagHandler=()=>{
        setFlag(false);
    }
    return <>
        {flag && <div class="container">
            <div class="background"></div>
            <div class="alert_box">
                {type==='success' && <div class="icon">
                <FontAwesomeIcon icon={faSquareCheck}/>
                </div>}
                {type==='error' && <div class="iconcolor">
                <FontAwesomeIcon icon={faCircleExclamation}/>
                </div>}
                {type==='success' && <header className='iconheader'>Success</header>}
                {type==='error' && <header className='iconheader1'>Error</header>}
                <p>{props.val.msg}</p>
                <div class="btns">
                <label class="cancelbtn" onClick={flagHandler}>Ok</label>
                <label class="cancelbtn" onClick={flagHandler}>Cancel</label>
                </div>
            </div>
        </div>}
    </>
}
export default Modal