import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import styles from './Appstyles.module.css'
import img from './assets/Mountains.webp'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
      <div className={styles.upper}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&family=Black+Ops+One&family=Cinzel+Decorative:wght@400;700;900&family=Exil
  e&family=Funnel+Display:wght@300..800&family=IM+Fell+English+SC&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Protest+Guerrilla&fam
  ily=Radio+Canada:ital,wght@0,300..700;1,300..700&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Share+Tech&display=swap" 
  rel="stylesheet"/>
  <Header />
  <div className={styles.content}>
  <Personal />
  <Outlet />
  </div>
      </div>
  )
}
function Header(){
 const [clicked, setClicked] = useState(() => {
    const stored = localStorage.getItem("clicked");
    return stored ? JSON.parse(stored) : 0;
  });

  // Update localStorage every time 'clicked' changes
  useEffect(() => {
    localStorage.setItem("clicked", JSON.stringify(clicked));
  }, [clicked]);

  function handleClick(button){
    setClicked(button);
  }
  return <>
  <nav className={styles.header}>
    <h1 className={styles.h1}>Rwid</h1>
    <div className={styles.navs}>
     <Link to="/Home" className={clicked==="home" ? styles.active : ""} onClick={() => handleClick("home")}>Home</Link>
      <Link to="/about" className={clicked==="about" ? styles.active : ""} onClick={() => handleClick("about")} >About</Link>
      <Link to="/contact" className={clicked==="contact" ? styles.active : ""} onClick={() => handleClick("contact")} >Contact</Link>
    </div>
    <p className={styles.copyright}>Copyright @2025 All Rights Reserved | This template is made with love by Rwid</p>
  </nav>
  </>
}
function Personal(){
  return <>
  <div className={styles.personal}>
    <div className={styles.circle}></div>
  <p className={styles.hello}>Hello from,</p>
  <h1 className={styles.name}>Rwid Shaki</h1>
  <p className={styles.desc}>Im an aspiring full stack web developer and an AI enthusiast. Most of this text is written to fill up this space for testing and could be changed afterwards</p>
  <img src={img} alt="" />
  </div>
  </>
}
export default App
