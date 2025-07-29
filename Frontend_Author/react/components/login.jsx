import styles from './login.module.css'
import { useState } from 'react';
import { Link,Navigate,useNavigate } from 'react-router-dom';
export function Login(){

   let [active,setActive]=useState();
    let [written,setWrite]=useState([]);
    let [username,setUsername]=useState("");
    let [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async (e) => {
        e.preventDefault();
        
        try{
            const res=await fetch("https://blog-api-ffu8.onrender.com/Adminlogin",{
                method:'POST',
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify({username,password}),
            })
            const data=await res.json();
            if(res.ok && data.token) {
                localStorage.setItem('token',data.token);
                navigate("/");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return <div className={styles.login}>
        <h1>Log in</h1>
        <div>
      <form onSubmit={handleSubmit}>
      <div className={styles.inputGrp}>
      <label className={[active=="username" ? styles.active : "",written.includes("username") ? styles.written : ""].join(" ")} htmlFor="username">Username</label>
      <input onFocus={() => setActive("username")} value={username} onChange={(e) => {
        e.target.value!=="" ? setWrite([...written,"username"]) : setWrite(written.filter(e => e!="username"))
        setUsername(e.target.value);
        }} onBlur={() => setActive("")}  type="text" required/>
      </div>
      <div className={styles.inputGrp}>
      <label className={[active=="password" ? styles.active : "",written.includes("password") ? styles.written : ""].join(" ")} htmlFor="password">Password</label>
      <input value={password} onFocus={() => setActive("password")} onChange={
        (e) => {e.target.value!=="" ? setWrite([...written,"password"]) : setWrite(written.filter(e => e!="password"))
            setPassword(e.target.value);
        }
        } onBlur={() => setActive("")} type="password" required/>
      </div>
      <button className={styles.btn} type="submit">Log in</button>
      </form>
      <hr />
      <p>Don`t have an account? <Link to="/signup">Sign up</Link></p>
      </div>  
    </div>
}