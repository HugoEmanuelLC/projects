// Dependencies
import { useEffect, useState, useContext } from "react";
// Scrypts
import { register } from "../scripts/authentication-scripts";
// Hooks Parent from App.jsx
import AppContext from "../../hooks/app-context";


function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // context from App.jsx
    const {setCheckAuth, setLoading} = useContext(AppContext);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        register({username, password})
        .then((res) => {
            console.log("res : ", res);
            setPassword("");
            setUsername("");
            // context from App.jsx
            setCheckAuth(true);
            setLoading(true);
            alert("Register Success ! " + res.message)
        })
        .catch((err) => {
            console.error("err : ", err.message);
            alert(err.message)
        });
    };

    return (
        <div id="loginPage">
            <form >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" onClick={(e) => handleSubmit(e)}>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;