import './MCQ.css'
const MCQ=(props)=>{
    return <>
    <div className={"mcqHeader"}>
        <div className="question">
            <p>{props.content.question}</p>
        </div>
        <hr></hr>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.a}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.b}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.c}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.d}</p>
        </div>
    </div>
    </>
}
export default MCQ;