"use client"
import style from './style.module.css'
import { FaGithub } from 'react-icons/fa';
import copy from 'copy-to-clipboard'
import Link from 'next/link';
<<<<<<< HEAD
export default function Page({ params }) {
=======
import UserContext from '@/context/userContext/userContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
export default function Page({ params }) {
    const { auth_status } = useContext(UserContext);
    const router = useRouter();
    if (auth_status == 'unauthenticated') {
        return router.push('/login');
    }
>>>>>>> d4bd070d647ae8aeac5386981f875b3c7741e3e1
    const url = window.location.href.split('/');
    const formId = url[4];
    const copyLinkHandler = () => {
        copy(document.getElementById('input').value);
    }
    return <>
        <div className={style.header}>
            <div className={style.logo}>
                <img src="/favicon.png" height="50px"></img>
                <h3>Think-Fast-Trivia</h3>
            </div>
            <div className={style.nav}>
                <div><a href={"/"}>Home</a></div>
                <div><a href={`/dashboard/${formId}`}>Preview</a></div>
                <div><a href={`/dashboard/${formId}/share-portal`}>Share</a></div>
                <div><a href={`/dashboard/${formId}/response`}>Response</a></div>
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
                    <input value={formId} id='input'></input>
                    <button className={style.button4} onClick={copyLinkHandler}>Copy</button>
                    <button className={style.button3}>Live</button>
                </div>
            </div>
            <div>
                <p className={style.shareLink}>Copy the FormId and paste it <b><Link href={'/search-form'}>Here</Link></b></p>
            </div>
        </div>
    </>
}