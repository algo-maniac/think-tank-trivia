import './Question.css'
const Question=(props)=>{    
    console.log(props)
    return<>
        <div className={"questionHeader"}>
        <div className="question">
            <p>{props.content}</p>
        </div>
        <hr></hr>
        <div className="answer">
            <textarea readOnly cols={100} rows={3} placeholder='Write your answer'></textarea>
        </div>
    </div>
    </>
}
export default Question;