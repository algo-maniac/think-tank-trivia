import style from './MCQ.module.css'
const MCQ=(props)=>{
    return <>
    <div className={style.mcqHeader}>
        <div className={style.question}>
            <p>{props.content.question}</p>
        </div>
        <hr></hr>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{props.content.a}</p>
        </div>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{props.content.b}</p>
        </div>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{props.content.c}</p>
        </div>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{props.content.d}</p>
        </div>
    </div>
    </>
}
export default MCQ;