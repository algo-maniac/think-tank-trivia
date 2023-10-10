import { useParams } from 'next/navigation'
import style from './style.module.css'
export default function Page({params}){
    const formId=params.id;
    console.log(formId);
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
    </>
}