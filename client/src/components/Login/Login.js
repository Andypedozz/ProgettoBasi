
import styles from './Login.module.css';

export default function Login(props) {

    const setUser = props.setUser;

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();

        fetch("/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                alert("Utente non trovato!");
            }else{
                setUser(data);
            }
        })
    }

    return (
        <div className={styles.loginContainer}>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label for="username">Username</label>
                        <input type="text" name="username" placeholder="Username" required/>
                    </div>
                    <input className={styles.loginBtn} type="submit" value="Login"/>
                </form>
            </div>
        </div>
    );  
}