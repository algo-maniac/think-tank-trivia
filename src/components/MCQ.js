import style from'./MCQ.module.css'
const MCQ=(props)=>{
    // console.log(props.data);
    const {data}=props;
    return <>
    <div className={style.mcqHeader}>
        <div className={style.question}>
            <p>{data.question}</p>
        </div>
        <hr></hr>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{data.a}</p>
        </div>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{data.b}</p>
        </div>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{data.c}</p>
        </div>
        <div className={style.answer}>
            <input type='radio' value={true}></input><p>{data.d}</p>
        </div>
    </div>
    </>
}
export default MCQ;