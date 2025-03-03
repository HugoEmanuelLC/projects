// Dependencies
import { useEffect, useState, useContext } from "react";
// Scrypts
import { login } from "../scripts/authentication-scripts";
// Hooks Parent from App.jsx
import AppContext from "../../hooks/app-context";


function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [msgErrorUsername, setMsgErrorUsername] = useState(false);
    const [password, setPassword] = useState("");
    // const [msgErrorPassword, setMsgErrorPassword] = useState(null);

    // context from App.jsx
    const { setCheckAuth } = useContext(AppContext);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        login({username, password})
        .then((res) => {
            setPassword("");
            setUsername("");
            // context from App.jsx
            setCheckAuth(res);
            props.setLoading(true)
        })
        .catch((err) => {
            setMsgErrorUsername(err.message)
        });
    };

    useEffect(()=>{
        msgErrorUsername != false && setMsgErrorUsername(false)
    }, [username])

    return (
        <div id="authenticationPage">
            <h2>Login</h2>
            <form >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                {msgErrorUsername && <p className="msgErr">{msgErrorUsername}</p>}

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;