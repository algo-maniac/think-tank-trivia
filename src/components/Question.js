import style from './Question.module.css'
import Link from 'next/link'
import dark from './darkQuestion.module.css'
const Question=(props)=>{    
    const mode=false;
    return<>
    <div className={`${mode?style.questionHeader:dark.questionHeader}`}>
        <div className={`${mode?style.question:dark.question}`}>
            <p>{props.data.question}</p>
        </div>
        <hr></hr>
        <div className={`${mode?style.answer:dark.answer}`}>
            <textarea readOnly cols={100} rows={3} placeholder='Write your answer' className={style.textarea}></textarea>
        </div>
    </div>
    </>
}
export default Question