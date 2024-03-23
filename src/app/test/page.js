import "./test.css"
import { FiArrowUpRight } from "react-icons/fi";
const Test=()=>{
    return <>
        {/* Hero section */}
        <div className="main-outer">
            <div className="header">
                <div className="header-text">
                    <div className="icon">
                        <img width={'42px'} height={'60px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGee6LwUzPPRnGFpp4Cy7tJb9CgXatDebXYg&usqp=CAU"></img>
                    </div>  
                    <div className="text">
                        <h5>Think-Fast-Trivia</h5>
                    </div>
                </div>
                <div className="header-button">
                    <div className="link">
                        <span>Form-Portal</span>
                    </div>
                    <div className="link">
                        <span>API</span>
                    </div>
                    <div className="login-btn">
                        <button className="button-26">Login</button>
                    </div>
                </div>
            </div>
            <div className="hero-section">
                <img draggable={false} src="https://media.giphy.com/media/l4XfgLyXAnyzCh7vfY/giphy.gif"></img>
            </div>
            <div className="content">
                <div className="heading">
                    <h3>Show <span>Creativity</span></h3>
                    <p>Streamline Your Data Flow, Empower Engagement Today, Effortless Forms,<br></br> Limitless Possibilities - Unleash Your Voice!</p>
                </div>
                <div className="btns">
                    <button className="button-40">
                        <div className="start-btn">
                            <div className="text">
                                <span class="text">Get Started</span>
                            </div>
                            <div className="icon">
                                <FiArrowUpRight/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div className="feature-section">
                <div className="heading">
                    <span>OUR FEATURE</span>
                </div>
            </div>
        </div>
    </>
}
export default Test;