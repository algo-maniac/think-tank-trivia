import './MCQ.css'
const MCQ=(props)=>{
    console.log(props.content);
    return <>
    <div className={"mcqHeader"}>
        <div className="question">
            <p>{props.content.question}</p>
        </div>
        <hr></hr>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.option1}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.option2}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.option3}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{props.content.option4}</p>
        </div>
    </div>
    </>
}
export default MCQ;