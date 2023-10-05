import './MCQ.css'
const MCQ=()=>{
    return <>
    <div className={"mcqHeader"}>
        <div className="question">
            <p>What is the capital of India?</p>
        </div>
        <hr></hr>
        <div className="answer">
            <input type='radio' value={true}></input><p>New Delhi</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>Mumbai</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>New York</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>Combodia</p>
        </div>
    </div>
    </>
}
export default MCQ;