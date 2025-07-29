import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.css'
import { useNavigate } from 'react-router-dom'
function App() {
  let navigate=useNavigate();
  let [articles,setArticles]=useState();
  useEffect(() => {
    let allData=async () => {
      let token=localStorage.getItem("token");
      let res=await fetch(`https://blog-api-itq8.onrender.com/AdminArticles`,{
        method:"POST",headers:{"authorization" : `Bearer ${token}`}
      })
      let articles=await res.json();
      setArticles(articles);
      console.log(articles);
      console.log(articles.Articles);
      if(!token || res.status===403 || res.status===401){
        navigate("/Adminlogin");
      }
    }
    allData();
  },[articles])

  async function handleSubmit(e,id){
    e.preventDefault();
    let token=localStorage.getItem("id");
    let res=await fetch(`https://blog-api-itq8.onrender.com/delete?id=${id}`,{
      method:"POST",
      headers : {"authorization": `Bearer ${token}`},
    }
    )
    if(res.ok) {
      navigate("/");
      setArticles(articles.filter(article =>  article.id!=id));
    }
  }

  return (
    <div className={styles.analytics}>
     <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&family=Black+Ops+One&family=Cinzel+Decorative:wght@400;700;900&family=Exil
  e&family=Funnel+Display:wght@300..800&family=IM+Fell+English+SC&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Protest+Guerrilla&fam
  ily=Radio+Canada:ital,wght@0,300..700;1,300..700&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Share+Tech&display=swap" 
  rel="stylesheet"/>
      <h1>Admin Dashboard</h1>
      <button className={styles.add_btn} onClick={() => navigate("/add")}>Add an Article</button>
      <div>
        <h2 className={styles.analytics_word}>Analytics</h2>
        <div className={styles.articles}>
        {articles && articles.Articles && articles.Articles.map(article => {
          return <div className={styles.article}>
            <button className={styles.edit_btn} onClick={() => navigate(`/edit?id=${article.id}`)}>Edit</button>
            <form onSubmit={(e)=> handleSubmit(e,article.id)}>
            <button className={styles.remove_btn} type="submit">Remove Article</button>
            </form>
            <img className={styles.admin_imgs} src={`https://blog-api-itq8.onrender.com/${article.cover_page}`} alt="" />
            <p>{article.title}</p>
            <p>{article.content.length>60 ? article.content.slice(0,60) + "..." : article.content}</p>
            <p>{article.comments.length} comments</p>
            <p>published : {article.published===false ? "false" : "true"}</p>
          </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default App
