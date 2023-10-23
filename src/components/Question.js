import style from './Question.module.css'
import Link from 'next/link'
const Question=(props)=>{    
    return<>
    <div className={style.questionHeader}>
        <div className={style.question}>
            <p>{props.data.question}</p>
        </div>
        <hr></hr>
        <div className={style.answer}>
            <textarea readOnly cols={100} rows={3} placeholder='Write your answer' className={style.textarea}></textarea>
        </div>
    </div>
    </>
}
export default Question