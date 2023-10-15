import './Loader.css'
const Loader=()=>{
    return (
        <>
        <div class="loader-container">
         <div class="wrapper">
            <div class="loader">
               <div class="dot first"></div>
            </div>
            <div class="loader">
               <div class="dot second"></div>
            </div>
            <div class="loader">
               <div class="dot third"></div>
            </div>
            <div class="loader">
               <div class="dot fourth"></div>
            </div>
            <div class="loader">
               <div class="dot fifth"></div>
            </div>
            <div class="loader">
               <div class="dot sixth"></div>
            </div>
         </div>
         <div class="text">
            Please wait
         </div>
      </div>
        </>
    )
}
export default Loader