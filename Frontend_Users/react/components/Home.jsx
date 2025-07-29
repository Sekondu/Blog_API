import styles from './home.module.css'
import { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import img from './AI.jpg';
export function Home(){
    let [articles,setArticles]=useState();
    let [Logged,setLogged]=useState();
    const navigate=useNavigate();
    useEffect(() => {
        async function data() {
            const token=localStorage.getItem('token');
        let things=await fetch("https://blog-api-ffu8.onrender.com/Articles",{
            method:"POST",
            headers : {
                'authorization' : `Bearer ${token}`
            }
        })
        if(things.status===403){
            setLogged(false);
        }
        else{
            setLogged(true);
        }
        let articles=await things.json();
        setArticles(articles.Articles);
        }
        data();
    },[])
    function Tokening(){
        localStorage.removeItem("token");
        navigate("/");
    }
return <div className={styles.home}>
    <div className={styles.home_header}>
    <h1>Articles</h1>
    <p>this section contains all articles</p>
    </div>
    <Data logged={Logged} setToken={Tokening} articles={articles}/>
    </div>
}
function Data({logged,setToken,articles}){
    const navigate=useNavigate();
    function navigation(id){
        navigate(`/article?id=${id}`);
    }
    const token=localStorage.getItem("token");
    if(!logged || !token){
        return <div className={styles.NotLogged}>
        <p><Link to="/signup">Sign up</Link> or <Link to="/login">Log in</Link> to view articles</p>
        </div>
    }
    else {
        if( !articles || articles.length===0){
            return <div>
                <h1>No Articles Found!</h1>
                <button onClick={() => setToken("")} className={styles.logOut}>Log out</button>
            </div> 
        }
        else{
            return <>
        <div className={styles.articles}>
        {articles.map(article => {
            return <div key={article.id} onClick={() => navigation(article.id)}>
                <p className={styles.img_article}>
                    <img src={img} alt="" />
                </p>
                <p>{article.title}</p>
                <p className={styles.article_content}>{article.content.length>80 ? article.content.slice(0,80) + "..." : article.content}</p>
            </div>
        })}
        </div>
        <button onClick={() => setToken()} className={styles.logOut}>Log out</button>
        </>
    }
        }
}