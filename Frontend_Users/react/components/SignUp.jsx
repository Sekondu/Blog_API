import { useState } from "react";
import styles from "./signup.module.css";
import { Link,useNavigate } from "react-router-dom";
export function SignUp(){

    let [active,setActive]=useState();
    let [written,setWrite]=useState([]);
    let [username,setusername]=useState("");
    let [confirm,setconfirm]=useState("");
    let [first,setfirst]=useState("");
    let [last,setlast]=useState("");
    let [password,setpassword]=useState("");
    let navigate=useNavigate();
    const handleSubmit=async (e) => {
        e.preventDefault();
        console.log("CMONNN");
        await fetch("https://blog-api-ffu8.onrender.com/signup",{
            method:"POST",
            headers : {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,first,last,password,confirm}),
        })
        navigate("/login");
    }
    return <div className={styles.signup}>
        <h1>Sign up</h1>
        <div>
            <form onSubmit={handleSubmit}>
            <div className={styles.inputGrp}>
            <label  className={[active=="username" ? styles.active : "",written.includes("username") ? styles.written : ""].join(" ")} type="hidden" htmlFor="username">Username</label>
            <input value={username} onFocus={() => setActive("username")} onChange={(e) => {
                e.target.value!=="" ? setWrite([...written,"username"]) : setWrite(written.filter(e => e!="username"))
                setusername(e.target.value)}} onBlur={() => setActive("")} type="text" name="username" id="username" required/>
            </div>
            <div className={styles.inputGrp}>
            <label className={[active=="first" ? styles.active : "",written.includes("first") ? styles.written : ""].join(" ")} htmlFor="first">First Name</label>
            <input value={first}  onFocus={() => setActive("first")} onChange={(e) => {
                e.target.value!=="" ? setWrite([...written,"first"]) : setWrite(written.filter(e => e!="first"))
                setfirst(e.target.value)}} onBlur={() => setActive("")} type="text" name="first" id="first" />
            </div>
            <div className={styles.inputGrp}>
            <label  className={[active=="last" ? styles.active : "",written.includes("last") ? styles.written : ""].join(" ")} htmlFor="last">Last Name</label>
            <input value={last} onFocus={() => setActive("last")} onChange={(e) => {
                e.target.value!=="" ? setWrite([...written,"last"]) : setWrite(written.filter(e => e!="last"))
                setlast(e.target.value)}} onBlur={() => setActive("")} type="text" name="last" id="last" />
            </div>
            <div className={styles.inputGrp}>
            <label className={[active=="password" ? styles.active : "",written.includes("password") ? styles.written : ""].join(" ")} htmlFor="password">Password</label>
            <input value={password} onFocus={() => setActive("password")} onChange={(e) => {
                e.target.value!=="" ? setWrite([...written,"password"]) : setWrite(written.filter(e => e!="password"))
                setpassword(e.target.value)}} onBlur={() => setActive("")} type="password" name="password" id="password" required/>
            </div>
            <div className={styles.inputGrp}>
            <label className={[active=="confirm" ? styles.active : "",written.includes("confirm") ? styles.written : ""].join(" ")} htmlFor="confirm">Confirm Password</label>
            <input value={confirm} onFocus={() => setActive("confirm")} onChange={(e) => {
                e.target.value!=="" ? setWrite([...written,"confirm"]) : setWrite(written.filter(e => e!="confirm"))
                setconfirm(e.target.value)}} onBlur={() => setActive("")} type="password" name="confirm" id="confirm" required/>
            </div>
            <button className={styles.btn} type="submit">Sign Up</button>
            </form>
            <hr />
        </div>
        <p className={styles.acc}>Have an account? <Link to="/login">Log in</Link></p>
    </div>
}