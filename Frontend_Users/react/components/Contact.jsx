import styles from './contact.module.css'
export function Contact(){
    return <div className={styles.contact_container}>
        <h1>Contact</h1>
        <div>
            <div className={styles.github}>
                <p>
                github: 
                </p>
                <p>
                email: 
                </p>
                <p>
                phone:   
                </p>
            </div>
            <div className={styles.email}>
                <p>
                <a href="https://github.com/Sekondu/Blog_API" target="_blank" rel="noreferrer noopener">https://github.com/Sekondu/Blog_API</a>
                </p>
                <p>
                rowaid2005@gmail.com
                </p>
                <p>
                 +999 0123 456 789
                </p>
            </div>
        </div>
    </div>
}