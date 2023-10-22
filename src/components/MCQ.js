import './MCQ.css'
const MCQ=(props)=>{
    // console.log(props.data);
    const {data}=props;
    return <>
    <div className={"mcqHeader"}>
        <div className="question">
            <p>{data.question}</p>
        </div>
        <hr></hr>
        <div className="answer">
            <input type='radio' value={true}></input><p>{data.a}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{data.b}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{data.c}</p>
        </div>
        <div className="answer">
            <input type='radio' value={true}></input><p>{data.d}</p>
        </div>
    </div>
    </>
}
export default MCQ;