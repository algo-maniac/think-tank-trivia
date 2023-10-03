import style from './style.module.css'
export default function App() {
  return<>
      <div className={style.header}>
        <div className={style.logo}>
            <img src="2.jpeg" height="50px"></img>
        </div>
        <div className={style.links}>
            <div>
                <a href="/dashboard" className={style.linkTitle}>Form-Portal</a>
            </div>
            <div>
                <a href="/formportal" className={style.linkTitle}>API</a>
            </div>
        </div>
        <div className={style.loginBtn}>
            <button className={style.button9}>Login</button>
        </div>
    </div>
    <div className={style.content}>
        <div className={style.slogan}>
            <h1>Show <span>Creativity.</span></h1>
            <h1><span>Build</span> Community.</h1>
            <div className={style.websiteDesc}>
                <p>Create custom forms and interactive quizzes effortlessly. Engage your audience and gather insights with ease on ThinkTankTrivia</p>
            </div>
            <div className={style.btn}>
                <button className={style.button68}>Get Started</button>
            </div>
        </div>
        <div className={style.sloganImage}>
            <img src="74pZ.gif"></img>
        </div>
    </div>
    <div className={style.working}>
        <div className={style.workingHeader}><h2>How it works</h2></div>
        <div className={style.createForm}>
            <div className={style.descIcon}></div>
            <div className={style.descImg}>
                <img src="Create-a-Form.png" height="90%" width="100%"></img>
            </div>
            <div className={style.descContent}>
                <div>
                    <h2>Create Your Form</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum nesciunt ea eum nulla recusandae placeat excepturi deserunt pariatur quidem, reiciendis voluptas fuga at atque facilis eveniet debitis! Perspiciatis, sed tenetur.</p>
                </div>
            </div>
        </div>
        <div className={style.createForm}>
            <div className={style.descIcon}></div>
            <div className={style.descImg}>
                <img src="istockphoto-500641404-612x612.jpg" height="90%" width="100%"></img>
            </div>
            <div className={style.descContent}>
                <div>
                    <h2>Fill Your Form</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum nesciunt ea eum nulla recusandae placeat excepturi deserunt pariatur quidem, reiciendis voluptas fuga at atque facilis eveniet debitis! Perspiciatis, sed tenetur.</p>
                </div>
            </div>
        </div>
        <div className={style.createForm}>
            <div className={style.descIcon}></div>
            <div className={style.descImg}>
                <img src="download.jpeg" height="90%" width="100%"></img>
            </div>
            <div className={style.descContent}>
                <div>
                    <h2>Analyse Your Performance</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum nesciunt ea eum nulla recusandae placeat excepturi deserunt pariatur quidem, reiciendis voluptas fuga at atque facilis eveniet debitis! Perspiciatis, sed tenetur.</p>
                </div>
            </div>
        </div>
    </div>
    <div className={style.newFeature}>
        <div className={style.featureTitle}>
            <h2 className={style.featureHeading}>Tryout our<br></br> <span className={style.black}>new templates</span></h2>
        </div>
        <div className={style.featureImg}>
            <div className={style.lightMode}>
                <div className={style.icon}>
                </div>
                <div className={style.img}>
                    <img src="07100e0e7d47b0eb58f7cef3d5e19224.png" height="100%" width="100%"></img>
                </div>
            </div>
        </div>
    </div>
    <br></br>
    <div className={style.websiteApi}>
        <h1 className={style.apiHeading}>Want<span className={style.green}> another feature?</span></h1>
        <div className={style.apiContent}>
            <div className={style.apiHeader}>
                <h1>Intoducing our<br></br> <span className={style.brown}>new Feature</span></h1>
                <button className={style.button68}>Get API</button>
            </div>
            <div className={style.apiImg}>
                <img src="Icons_API.png" height="100%" width="100%"></img>
            </div>
        </div>
    </div>
    </>
}
