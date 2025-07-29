import styles from './add.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Add(){
        let [title,setTitle]=useState();
        let [content,setContent]=useState();
        let [img,setImg]=useState();
        let [checked,setCheck]=useState(false);
        const navigate=useNavigate();

        async function handleSubmit(e){
            e.preventDefault();

            let token=localStorage.getItem("token");
            let formdata=new FormData();
            formdata.append("title",title);
            formdata.append("content",content);
            formdata.append("published",checked);
            if(img) {
                formdata.append("img",img);
            }
            let response=await fetch(`https://blog-api-yuv6.onrender.com/AddArticle`,{
                method:"POST",
                headers : {"authorization" : `Bearer ${token}`},
                body:formdata,
            })
            if(response.ok){
                navigate("/");
            }
        }
    return <div>
        <form className={styles.add_form} onSubmit={handleSubmit}>
                        <input type="file" encType="multipart/form-data" name="img" onChange={(e) => setImg(e.target.files[0])}/>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    <textarea minLength={10} name="" id="" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                    <div className={styles.publish}>
                    <p>publish</p>
                    <input name="publish" type="checkbox" checked={checked} onChange={(e) => setCheck(e.target.checked)}/>
                    </div>
                    <button className={styles.add_btn} type="submit">Add</button>
                    </form>
    </div>
}

export default Add;