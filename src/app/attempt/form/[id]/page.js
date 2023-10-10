import { useParams } from 'next/navigation'
import style from './style.module.css'

export default function Page({params}){
    const formId=params.id;
    console.log(formId);
    // dummy data need to connect backend
    const questions=[{type:false,question:"Who is Honey Singh"},{type:true,question:"Capital of India",option1:"New Delhi",option2:"Mumbai",option3:"Bengalore",option4:"Kolkata"}]
    return<>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>Light</button>
                <button className={style.button31}>Dark</button>
            </div>
        </div>
        <div className={style.header1}>
            <div>
                <h1>Fill out the Form </h1>
            </div>
        </div>
        {
            questions.map(function(data){
                if(data.type==false){
                    return <>
                        <div className={style.questionHeader}>
                            <div className={style.question}>
                                <p>{data.question}</p>
                            </div>
                            <hr></hr>
                            <div className={style.answer}>
                                <textarea className={style.textfield} cols={100} rows={3} placeholder='Write your answer'></textarea>
                            </div>
                        </div>
                    </>
                }
                else{
                    return<>
                        <div className={style.mcqHeader}>
                            <div className={style.question}>
                                <p>{data.question}</p>
                            </div>
                            <hr></hr>
                            <div className={style.answer}>
                                <input type='radio' value={true}></input><p>{data.option1}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value={true}></input><p>{data.option2}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value={true}></input><p>{data.option3}</p>
                            </div>
                            <div className={style.answer}>
                                <input type='radio' value={true}></input><p>{data.option4}</p>
                            </div>
                        </div>
                    </>
                }
            })
        }
    </>
}