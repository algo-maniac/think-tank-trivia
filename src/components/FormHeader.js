import style from './FormHeader.module.css'
const FormHeader=(props)=>{
    return<>
        <div className={style.header}>
            <h2>{props.formName}</h2>
            <hr></hr>
            <p>This is a form to collect the data from all the student</p>
        </div>
    </>
}
export default FormHeader