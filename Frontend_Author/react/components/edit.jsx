import { useSearchParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import styles from './edit.module.css'
function Edit(){
    let [article,setArticle]=useState();
    let [title,setTitle]=useState();
    let [content,setContent]=useState();
    let [img,setImg]=useState();
    let [checked,setCheck]=useState(false);
    const [searchParams]=useSearchParams();
    const navigate=useNavigate();
        useEffect(() => {
        let id=searchParams.get("id");
        const token=localStorage.getItem("token");
        const data=async () => {
            let res=await fetch(`http://localhost:3000/article?id=${id}`,{
                method:"GET",
                headers:{"authorization" : `Bearer ${token}`}
            })
            let article=await res.json();
            setArticle(article.article);
            if(res.status===403 ||res.status===401){
                navigate("/");
            }
            setCheck(article.article.published===false ? false : true);
            setTitle(article.article.title);
            setContent(article.article.content);
        }
        data();
    },[])

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published",checked)
    if (img) {
      formData.append("img", img);
    }

        let id=searchParams.get("id");
        let token=localStorage.getItem("token");
        let res=await fetch(`https://blog-api-yk96.onrender.com/article?id=${id}`,{
            method:"PUT",
            headers:{"authorization" : `Bearer ${token}`},
            body:formData,
        })
        if(res.ok) {
            navigate("/");
        }
    }

    if(article){
return <div>
        {article && <div>
            <form className={styles.edit_form} onSubmit={handleSubmit}>
                <input type="file" encType="multipart/form-data" name="img" onChange={(e) => setImg(e.target.files[0])}/>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea name="" id="" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <div className={styles.publish}>
            <p>publish</p>
            <input name="publish" type="checkbox" checked={checked} onChange={(e) => setCheck(e.target.checked)}/>
            </div>
            <button className={styles.edit_btn} type="submit">Update</button>
            </form>
            {article.comments && article.comments.map(comment => {
                <div>
                    <p>{comment.author.username}</p>
                    <p>{comment.title}</p>
                    <p>{comment.content}</p>
                </div>
            })}
            </div>}
    </div>
    }

}

export default Edit;