import './Question.css'
import Link from 'next/link'
const Question=(props)=>{    
    return<>
    <div className={"questionHeader"}>
        <div className="question">
            <p>{props.data.question}</p>
        </div>
        <hr></hr>
        <div className="answer">
            <textarea readOnly cols={100} rows={3} placeholder='Write your answer'></textarea>
        </div>
    </div>
    </>
}
export default Question