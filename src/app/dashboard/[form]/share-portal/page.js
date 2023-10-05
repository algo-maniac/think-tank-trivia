import style from './style.module.css'
import { FaGithub } from 'react-icons/fa';
export default function Page({params}){
    const formId=params.form;
    console.log(formId);
    return <>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/2.jpeg" height="50px"></img>
            </div>
            <div className={style.nav}>
                <div><a href>Preview</a></div>
                <div><a href={formId+"/share-portal"}>Share</a></div>
                <div><a href="/response">Response</a></div>
                <div><a href="/setting">Setting</a></div>
            </div>
            <div className={style.mode}>
                <button className={style.button4}>Light</button>
                <button className={style.button31}>Dark</button>
            </div>
        </div>
        <div className={style.shareportal}>
            <div className={style.shareheader}>
                <h1>Share It</h1>
            </div>
            <div className={style.sharecontent}>
                <div className={style.dialog}>
                    <h3>Your Form is ready to deploy</h3>
                    <p>Share the link directly on any site</p>
                </div>
                <h4>Form Link</h4>
                <div className={style.inputcard}>
                    <input value={"links/asjdbajsbdas/adbasjbdaksd/ajbsdjasd"}></input>
                    <button className={style.button4}>Copy</button>
                    <button className={style.button3}>Live</button>
                </div>
            </div>
        </div>
    </>
}