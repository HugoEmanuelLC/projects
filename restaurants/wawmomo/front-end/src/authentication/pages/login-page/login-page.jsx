// Dependencies
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// Scrypts
import { login } from "../../scripts/authentication-scripts";


function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [msgErrorUsername, setMsgErrorUsername] = useState(false);
    const [password, setPassword] = useState("");
    // const [msgErrorPassword, setMsgErrorPassword] = useState(null);
    
    const { setCheckAuth } = props.valueCheckAuth;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        login({username, password})
        .then((res) => {
            setPassword("");
            setUsername("");
            setCheckAuth(res);
        })
        .catch((err) => {
            setMsgErrorUsername(err.message)
        });
    };

    useEffect(()=>{
        msgErrorUsername != false && setMsgErrorUsername(false)
    }, [username])

    return (
        <div className="loginFormContainer">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                    required
                />
                </div>
                <div className="formGroup">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    required
                />
                </div>
                <button type="submit" className="button">Se connecter</button>
                {msgErrorUsername && <p className="msgErr">{msgErrorUsername}</p>}
            </form>
            <div>
                <p className="smallTxt">
                    Mot de passe oublié ? <NavLink to="/dash/auth/forgot-password">Cliquez ici</NavLink>
                </p>
            </div>

        </div>
    );
}

export default LoginPage;