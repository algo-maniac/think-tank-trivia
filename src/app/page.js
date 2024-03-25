"use client";
import "./test.css"
import { FiArrowUpRight } from "react-icons/fi";
import form1 from "/public/form.png"
import { useContext } from "react";
import UserContext from "@/context/userContext/userContext";
import { useRouter } from "next/navigation";
import Typewriter from 'typewriter-effect';
import { signOut } from "next-auth/react";

const Test = () => {

  const { auth_session: data, auth_status: status } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const router = useRouter();
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
            <span onClick={() => {
              if (status == "unauthenticated") {
                router.push('/login')
              } else {
                router.push('/dashboard')
              }
            }}>Form-Portal</span>
          </div>
          <div className="link">
            <span onClick={() => {
              if (status == "unauthenticated") {
                router.push('/login')
              } else {
                router.push('/analytics')
              }
            }}>Analytics</span>
          </div>
          <div className="login-btn">

            {
              status == "unauthenticated" ?
                <button className="button-26" onClick={() => {
                  router.push('/login');
                }}>Login</button> :
                <div className="user">
                  <img className="userImage" src={data.user.image} alt="dp" />
                  <div className="drop_down" onClick={()=>{
                    signOut();
                  }}>
                    logout
                  </div>
                </div>
            }


          </div>
        </div>
      </div>
      <div className="hero-section">
        <img draggable={false} src="https://media.giphy.com/media/l4XfgLyXAnyzCh7vfY/giphy.gif"></img>
      </div>
      <div className="content">
        <div className="heading">
          {/* <h3>Show <span>Creativity</span></h3> */}
          <h1 className="typewriter">
            <Typewriter
              options={{
                strings: ['Build Community', 'Spread Community', 'Grow Community'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p>Streamline Your Data Flow, Empower Engagement Today, Effortless Forms,<br></br> Limitless Possibilities - Unleash Your Voice!</p>
        </div>
        <div className="btns">
          <button className="button-40">
            <div className="start-btn">
              <div className="text">
                <span class="text">Get Started</span>
              </div>
              <div className="icon">
                <FiArrowUpRight />
              </div>
            </div>
          </button>
        </div>
        {/* <img src="https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif"></img> */}
      </div>
      <div className="feature-box">
        <div className="feature1">
          <div className="img">
            <img draggable={false} src="https://media.giphy.com/media/l4KhQo2MESJkc6QbS/giphy.gif?cid=790b76117okumfeujocsgo4rqe2rzwjsdxrd7yb3wfyxuaqi&ep=v1_gifs_search&rid=giphy.gif&ct=g"></img>
          </div>
          <div className="heading">
            <h3>Fast & Flexible</h3>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <p>Our Application is faster than others</p>
          </div>
        </div>
        <div className="feature1">
          <div className="img">
            <img draggable={false} src="https://media.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif?cid=790b7611m24ldx0xkeguhnpp28unmuh35eau7wkazivct2et&ep=v1_gifs_search&rid=giphy.gif&ct=g"></img>
          </div>
          <div className="heading">
            <h3>Gather Information</h3>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <p>Our Application is faster than others</p>
          </div>
        </div>
        <div className="feature1">
          <div className="img">
            <img draggable={false} src="https://media.giphy.com/media/hnj3fj9zQAVms8zMNg/giphy.gif?cid=ecf05e47y9ttagk16ql9c34wx2ua0035qerwzbkwrmwlv9ma&ep=v1_gifs_search&rid=giphy.gif&ct=g"></img>
          </div>
          <div className="heading">
            <h3>Analyse Performance</h3>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <p>Our Application is faster than others</p>
          </div>
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
      <div className="our-team">
        <div className="heading">
          <span>OUR TEAM</span>
        </div>
        <div className="members">
          <div className="member">
            <div className="left">
              <img draggable={true} src="protyay.png"></img>
            </div>
            <div className="right">
              <div className="heading-text">
                <h3>Protyay Ray</h3>
              </div>
              <div className="role">
                <span>Frontend & Backend</span>
              </div>
              <div className="desc">
                <p>

                  A foundational member created the Login/Signup page, managed the database, and integrated APIs for streamlined user interaction. </p>
              </div>
              <div className="social">
                <a href="https://github.com/Protyay140">
                  <span><img src="data:image/jpeg;base64,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"></img></span>
                </a>
                <a>
                  <span><img src="linkedin.png"></img></span>
                </a>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="left">
              <img draggable={true} src="tuhin.png"></img>
            </div>
            <div className="right">
              <div className="heading-text">
                <h3>Tuhin Saha</h3>
              </div>
              <div className="role">
                <span>Frontend Developer</span>
              </div>
              <div className="desc">
                <p>
                  Led website UI/UX development, contributed to ideation, and managed projects for the company's digital presence.</p>
              </div>
              <div className="social">
                <a href="https://github.com/Tsaha11">
                  <span><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQDxMSEA8OEQ4QEBEVEhYQDQ8VFRcQGBMWFxYTFRYYHSggGhsmGxcVITEhJSorLjAuGB8zODMtNygtMCsBCgoKDQ0NDw0NFSsZFRkrKysrKzcrLS0rKysrLS0rKysrLSsrLSsrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAMBAQEBAAAAAAAAAAAAAQYHCAUEAwL/xABBEAACAQMBBQQHBAYKAwAAAAAAAQIDBBEFBgcSITETQVFhCBQiQnGBkSMyobEVUmJywdEzNUNEc3SisrPCJZLD/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwDVAIDTKggAoIAKCACggAoIAKCACggAoIAKCACggAoIAKCACggAoIAICACggAoIAKCACggAoIf1Si5vEIynLwhGUn9EBAezZ7JajWSdLT7yUX0fY8K/1YPUp7sdYl0sGv3rm2X/AHFViQMvnuv1hdbHP7t1bP8A7Hm3WxepUk3PTrtJdWqakvrFvIo8IH9V6cqbxUhOm/CpTlB/6kj+AiggAoIAKCACghQAIAKCAACACggAoIAKCH16Tpla7rRo21KVWtPpGPcv1pPuXmB8jZlOymwN9qOJUqXZ27/taycYteMF1l8ehtTYXdHQteGtf8NzdLDUP7CnLyT++14y+SNnRiksJJJdEkSrGtdn9zdlRSdzKd1U5PEnww8furr8zPdO0a3t0o0LejSS6cFOK/E+4EUAAAAAfLe6dRrxca1GlUi1hqcIvl4czB9f3RafcJujGVrUfPNJ+zn918jYQA5o2r3Z39jmah6zbr36Kbkl+1Dr9DClLPNc0dmGA7cbrrXUOKrRxa3rX34L2JtdFVh0f7yw+nXoWpHOQPS2i2fudPrdjdUuCfuyTzCa8YS7/wAzzCooIAKCACggApAQACACggAoIfXpGm1buvTt6EeKtVliK7l4yfgkuYH17M7P19RuY29tHMnznJp8NOHfOb/Jd50vsZshb6XQVOjHiqS51askuOcvFvuXgibEbJ0dLtVSppOrLDrVGvanUxzb8vBGRGWgEbS6tL4hPPQCgAAAAAAAAAAA2SMk+jT+DA8vaTZ631ChKhc01OD+6/ehLulB9zRzTtvshX0q47OrmdGbfY1UuU4+D8JrvXzR1WeXtJoNG/tp29xBShNcn3xl3Ti+5oDkYHrbVbPVtOup29bm486c8cp02+U1/HzPINIoIAiggAoIAICFCgIUA2b/ANyWx3qtv67Xhi6uo/ZqSWadtnkvJywpPywu41Tu12a/SWo06Ulm3pfaV+XJwT5Qf7z/AATOpYxSSSWElhfAmmKACK1F6QGtTp0ra3pznB1JynNwm4vhisJZXPqzU+k7W39rLNC8rrnnhnNzi35qX8zNPSBk/wBJUU2+FWzx4Z4uZrAqN0bKb6+ap6jS4U+XbUU2vjKHX6G3tP1GjcUo1qFWnVoyWVOEk44+Jx0fpC6qRg4RqVI03LicY1JKLl4uKeMiDrHUdrbC3Tda9toY6/bRbTzjpHLPJnvP0lf3+k/3VN/wOX0l4FyIV09HehpL/v1NfGM/5Ho2G22nV89lf2ssdc1VH/dg5QyRpPqkIV2X6zDg4+OHZpZcuOPDw+PF0wau2v3zUKDlSsIes1VlOo8qkn5PrL5Gio3M1CUFUqKnPHFFVJcLS6Jxzhn5CFZHre3Oo3jfa3dSMH7lF9nHGfLn+Jlm4zXakdSnRqVak43FF4VSpOXtweeWW8cmawMu3Tya1q1x1zP6cPMDqIAEVhO9bY9alZOVOK9dtlKdB8sy75UW/CSX1wzmd5XJppp4aaw011TXczs45x307Mep3/b044t7xufJLEa/vr5/e+OfEuI18AQooIAKAAICACgh/VOm5yjCP3pyjFfGTSX5gdBbh9D7HT5XEl9pdTysr+zjyibNPg0GwVta0aMVhUqUI480ln8T7zKgB8+o3kKFGpWqNKnShKUm/BLIGmvSJt48VpUU4dp9pFx95x68XwzyNOHrbV6/U1G8qXNRv23inFvlCkvuxXh4s8gqKCAooIAKCACggApn25C2hPWIynOMZU6M5QTeHKT5YXjhGAH7WV3UoVYVqUuGtSkpQl4SX8CDssHhbE7Qx1GxpXMeUpxxUX6tRcpL6nukUMM3taF65pdVJfa0V2sPHMebX0MzP4rU1OLi+kk0/g1gDjFMp9+0Ng7a8uKDWOxr1IrL93OY/g0eeVFBAUUEAEABAPc2HtFW1SypyWYyuqeV5J8X8DwzMN0FPi12z8u3f0oTA6iABFDXG/fVHR0rs4tp3VaFJ4ePYSc5/JqOPmbHNP8ApGSfq9kvd7ern49ny/NgaNABUAAAAAAAAAAAAAG5fR21V8d3aOSxiFeEc8+vBUa8v6P6+Zu0539H7+t6n+Qrf81A6IIoAAOY98toqWt3GFhVIUaj/elDDf4GEmyvSBp41ak/1rGH4VaiNalQAAAAAQEAFMy3Ozxrtp5q4X1oTMMMh3d3PZaxYzbwlcxTflJOLX4gdZgAihqj0iKLdhbTSbULtJ4T5KVKay/DmkvmbXMT3paO7zSLmnFN1IwVSGMZc6bU0ufjjAHLAInkFRQQAUEAFBABQQAUEAG1vR4s+K/ua2XilaqGO77Son/8jfxqz0ftHdKwq3EopSuq3svHN0oLhjnyzxNfE2mRQAAc8+kHPOrUV4WMP+aozWRne+65VTW6uHns6NCHw9ltr6tmBlRQQAUEAEAAA/W1r9nUhUXWnUhP/wBZKX8D8iAdm6ZdqtQp1YtONSnCSa6c0mfSa+3I636zpcKcm3UtZOm84zw9Y9O7BsEihJRTTTWU1h/AoA5a3obKS02/mlF+q3EpVKLxyWXmUPin+Bh515tZs1Q1K1lb3EeT5wnH70J904v+Hec3bZ7v7zTJvjpyrW3u1qUW1j9tLnF/gBigImCooAAAAAAQCnqbM6FU1C7p21FPiqP2mvcpr7038j9dmdlbvUaiha0ZSjn2qkk1TivFy/kdIbv9hqOk0OGOKl1US7aq44cn+rHwgu5AZBpGnwtbenQpJKnShGEUvBI+wAihJSSTb5JLL+BTGN5Gtqy0y4q5xNwcIYazxy5LGQOaNr9Q9Z1G6rcsVLibWHywnwr8EeQT49e/4lKgAAAAAgIAKCADPdzW0vqWpRhUli3u8U5ZfJVPcl18eXzR00cUZOnN0W2K1KxUKks3lqowrJ4zKPuVUvBpc/NMivq3l6RqFzbRemXM6VenJtwjNQ7SOPu8T6PwzyNNaFvN1PTq7p3UqleMJuNWlcLFSLWE0n1T8unM6WNW77NiI3Vu723gvW7eOanCudWguqeOso9z8OXhgM92Z2goahbQuLeWYS6p/ejPvhJdzR6dSCkmpJOL6prKOXt1u2z0q6+04pWdxwqsk37L7qsV4rv8vgdOWN5Tr041KM41KU0nGUWmmgMP1/dXpt23LsOxqvPtUJcHN97S5MwfU9xGMyoaglBJt9vRT+eYtY+hu8wHfXrkrTSpxhLhqXMlSXPD4X97HyA5u1C3VKtUpxqRqxpzcVOCajLHes9x+B/KKVFC83hZWXjOF447yADbeg7lHc06db9JUZUKkVJOhRbbi13SbwvoZzoW53TbZqVSNS5mu+tLl1z9xcjwPR41uU6Ne0m21QcalPPdCfVfVPkbiIr8bW1hSioUoQhBdFCKS/A/YAAAABz/AL/Npu2uoWVOWadt7VXD5Os1yj8lz+aNt7wNqoaXYzryw60vYoQysyrNcvkur8kco3NxOrOVSpJzqVJOU5Pq5N5bYH8AgKiggAoIAICACggAp7OyG0dXTbyFzRbfDyqRzynSb9qL/h5nigDsfZ3XKN/bQuLefFTqLPnGXfGS7mj0KkFJNNZTTTXkzlTd7txW0mvlZna1Gu2pZ/1x8JfmdO6FrVC9oRr21SNSlNdU+affGS7mRXMO8jZaem39SDi1b1ZSnQl3ODeXFeafcefs9tZe6fytLmdODeXB4lDPjws6r1/Qbe/oujdUY1ab6ZXOL/Wi+qZq7VNxFJyzbXlSEefs1IqXwWQMMrb49VlHhVShF/rRo8/xZiOt7QXV7LiuripWaeUpP2YvGPZj0RtCO4ar330Mf4Ri28fd8tHp0ZesOtKtOUX7CiklHPIDBQQFRQQAbV9HmT/SNddzt1n5SZ0Ic8+j1/WVb/Lf9joYigAAHz6he07elOrWnGFKnFylKTwkkL+9p0KcqtacadKCzKUnhJHN29HeJPU6nY0HKFhTlyXR1Wvfl5eCA8veNtjPVrx1Paja0sxt4Puj3zf7T/kYoQFRQQAUEAFBABAAFAAAAAA9/Y/a+60ut2ltP2JNdpSlngmvNdz80eAAOqth94lnqkVGEuxukvao1WlL4wfvx8180jMDianUcZKUZSjKLTi4tpqS6NNc0zaGx++e6tkqd7H1qiuSnyVVLz7pfny7yDok0z6R/wDQ2f8Aiz/2MzvZ7eJp16l2dzCE37lV8Ek/Dmaw9IDaG3uHbUKFWNWpSlOdRwaajlOKTfiBp8AFAAAbW9Hdf+QuH3q3X+5nQhzRuP16jZ6lJXE404V6PDGcniKmnlJvuzz+hvXW9t7CzjxVrulnGVGMlKT8MJfAgyIx7a/bO00ulx3NVdo0+zpQw6s3+zHw83yNTbXb7qtRSp6dT7GLyu2qJOfxhHon8TUt7eVK9SVStUnUqzeZSnJuT+b/ACAyfbzb+51aeJ/ZWkZZp0Yvl5Sm/el+BiQBQAAAAAAAAAARAQEVQQAUEAFBABQQAX8wQAUEAFBABQ3835sgAoIAKCACggAoIAKCACggAgIAKCACggAoIAKCACggAoIAKCACggAoIAKCACggAoIAKCACghQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="></img></span>
                </a>
                <a>
                  <span><img src="linkedin.png"></img></span>
                </a>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="left">
              <img draggable={true} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJz9D6IuHUkf9nQtjipdq8BBIO9CCfLWQvIw&usqp=CAU"></img>
            </div>
            <div className="right">
              <div className="heading-text">
                <h3>Tonmoy Biswas</h3>
              </div>
              <div className="role">
                <span>Backend Developer</span>
              </div>
              <div className="desc">
                <p>
                  Integrated numerous APIs into the backend and oversaw MongoDB database management for efficient system functionality.</p>
              </div>
              <div className="social">
                <a href="https://github.com/tonmoy1912">
                  <span><img src="data:image/jpeg;base64,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"></img></span>
                </a>
                <a>
                  <span><img src="linkedin.png"></img></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
export default Test;