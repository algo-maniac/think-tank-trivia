import style from './Notfound.module.css'
const Notfound=()=>{
    return <>
        <div className={style.notfoundcontainer}>
            <div>
                <img src="/image_processing20190904-13360-t94bfa.gif" height={"150px"} width={"200px"}></img>
            </div>
            <div className={style.header}>
                <h2>No Forms found</h2>
            </div>
        </div>
    </>
}
export default Notfound;