import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams,Link } from "react-router-dom";
import styles from './article.module.css';
export function Article(){
    const [searchParams]=useSearchParams();
    let [article,setArticle]=useState();
    let [commentTitle,setTitle]=useState("");
    let [commentContent,setContent]=useState("");
    let [commentAuthor,setAuthor]=useState();

    useEffect(() => {
        let data=async () => {
            const token=localStorage.getItem("token");
            const id=searchParams.get("id");
            let res=await fetch(`http://localhost:3000/article?id=${id}`,{
                headers : {
                    "authorization" :  `Bearer ${token}`,
                }
            }
            )
            let response=await res.json();
            setArticle(response.article);
        }
        data();
    },[])
    
    async function handleSubmit(e){
        e.preventDefault();
        const id=searchParams.get("id");
        const token=localStorage.getItem("token");
        let res=await fetch(`http://localhost:3000/AddComment?id=${id}`,{
            method:"POST",
            headers:{
                "authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json",
            },
            body:JSON.stringify({title : commentTitle,content:commentContent}),
        }
        )
        let response=await res.json();
        setAuthor(response);
        if(res.ok){
            setContent("");
            setTitle("");
            fetchArticle();
        }
    }

    async function fetchArticle() {
  const token = localStorage.getItem("token");
  const id = searchParams.get("id");
  const res = await fetch(`http://localhost:3000/article?id=${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  setArticle(response.article);
}

    if(article && article.comments.length>0){
        return <div className={styles.container}>
            <div className={styles.header}>
            <Link to="/home"><button className={styles.home_but}>Go Back</button></Link>
            </div>
                <div className={styles.img_container}><img src={`http://localhost:3000/${article["cover_page"]}`} /></div>
                <p className={styles.title}>Title : {article["title"]}</p>
                <p className={styles.content}>{article["content"]}</p>
                <div className={styles.comments}>
                    <h2>Comments</h2>
                {article.comments.map(comment => {
                    return <div className={styles.comment}>
                        <p className={styles.comment_title}>{comment.title}</p>
                        <p className={styles.username}>{comment.author.username}: {comment.content}</p>
                        </div>
                })}
                <h3>New Comment</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder="title" type="text" value={commentTitle} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="content" type="text" value={commentContent} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button className={styles.submit} type="submit">Submit Comment</button>
                </form>
        </div>
    }
    else if(article){
        return <div className={styles.container}>
            <div className={styles.header}>
            <Link to="/home"><button className={styles.home_but}>Go Back</button></Link>
            </div>
                <div className={styles.img_container}><img src={`http://localhost:3000/${article["cover_page"]}`} /></div>
                <p className={styles.title}>Title : {article["title"]}</p>
                <p className={styles.content}>{article["content"]}</p>
                <div className={styles.comments}>
                <h3>Be the first to comment</h3>
                <form className={styles.comment_form} onSubmit={handleSubmit}>
                    <input placeholder="title" type="text" value={commentTitle} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="content" type="text" value={commentContent} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button className={styles.submit} type="submit">Submit Comment</button>
                </form>
                </div>
        </div>
    }
    else{
         return <>
    <h1>No article Found!</h1>
    </>
    }

}