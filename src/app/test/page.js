import "./test.css"
import { FiArrowUpRight } from "react-icons/fi";
import form1 from "/public/form.png"
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
                <div className="timeline-container">
                    <div className="content-section">
                        <div className="box">
                            <div className="left-side" data-aos="fade-right">
                                <div className="serial">
                                    <span>1</span>
                                </div>
                                <div className="header1">
                                    <h4>Create Your Form</h4>
                                </div>
                                <div className="text-content">
                                    <p>Welcome to the creative hub of Think Fast Trivia! With our "Create Your Form" feature, the power to craft engaging quizzes and forms is now at your fingertips. Unleash your creativity, challenge your friends, and spark exciting conversations with personalized quizzes tailored to your interests.</p>
                                </div>
                            </div>
                            <div className="right-side" data-aos="fade-left">
                                <img src="form.png"></img>
                            </div>
                        </div>
                    </div>
                    <div className="line">
                        <svg className="h-3rem h-sm-5rem h-lg-7rem" viewBox="0 0 444 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M442.989 1C443.49 18.4197 426.571 53.2592 354.892 53.2591C265.293 53.2591 126.139 53.2591 80.0875 53.2591C34.0366 53.2591 7.00663 85.784 0.999979 111" stroke="currentColor" stroke-dasharray="7 7"></path>
                        </svg>
                    </div>
                    <div className="content-section">
                        <div className="box box1">
                            <div className="right-side" data-aos="fade-right">
                                <img src="form.png"></img>
                            </div>
                            <div className="left-side" data-aos="fade-left">
                                <div className="serial">
                                    <span>2</span>
                                </div>
                                <div className="header1">
                                    <h4>Fill Your Form</h4>
                                </div>
                                <div className="text-content">
                                    <p>Ready for a brain-teasing adventure? Dive into the diverse world of trivia crafted by the Think Fast Trivia community with our "Fill Your Form" feature. Whether you're a seasoned trivia enthusiast or a casual player, this is your chance to explore a multitude of quizzes and forms created by users just like you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line">
                        <svg className="h-3rem h-sm-5rem h-lg-7rem" viewBox="0 0 444 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.01068 1C0.510125 18.7364 17.4289 54.2093 89.1082 54.2093C178.707 54.2093 317.861 54.2093 363.912 54.2093C409.963 54.2093 436.993 87.3256 443 113" stroke="currentColor" stroke-dasharray="7 7"></path>
                        </svg>
                    </div>
                    <div className="content-section">
                        <div className="box">
                            <div className="left-side" data-aos="fade-right">
                                <div className="serial">
                                    <span>3</span>
                                </div>
                                <div className="header1">
                                    <h4>Analyze Your Performance</h4>
                                </div>
                                <div className="text-content">
                                    <p>Elevate your trivia game to new heights with the "Analyze Your Performance" feature on Think Fast Trivia. Dive into detailed insights and statistics that go beyond the thrill of answering questions. Understand your strengths, pinpoint areas for improvement, and track your progress as you embark on your trivia journey.</p>
                                </div>
                            </div>
                            <div className="right-side" data-aos="fade-left">
                                <img src="form3.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Test;